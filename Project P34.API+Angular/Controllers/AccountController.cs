using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Project_IDA.DTO.Models;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.Domain.Interfaces;
using Project_P34.DTO.Models;
using WebCrudApi.Helpers;

namespace Project_IDA.Api___Angular.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IJWTTokenService _jwtTokenService;

        public AccountController(
            EFContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IJWTTokenService jWtTokenService)
        {
            _userManager = userManager;
            _context = context;
            _configuration = configuration;
            _signInManager = signInManager;
            _jwtTokenService = jWtTokenService;
        }
     
        [HttpPost("register")]
        public async Task<ResultDto> Register([FromBody]UserRegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDto
                {
                    Status = 500,
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }
            
            

            var user = new User()
            {
                UserName = model.Email,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            var userProfile = new UserMoreInfo()
            {
                Age = model.Age,
                FullName = model.FullName,
                Id = user.Id,
                Address = model.Address
            };
          
            
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return new ResultErrorDto
                {
                    Status = 500,
                    Errors = CustomValidator.GetErrorsByIdentityResult(result)
                };
            }
            else
            {
                result = _userManager.AddToRoleAsync(user, "User").Result;
                _context.userMoreInfos.AddAsync(userProfile);
                _context.SaveChanges();
            }

            return new ResultDto
            {
                Status=200
            };
        }



        [HttpPost("login")]
        public async Task<ResultDto> Login([FromBody]UserLoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return new ResultErrorDto
                {
                    Status = 400,
                    Message = "ERROR",
                    Errors = CustomValidator.GetErrorsByModel(ModelState)
                };
            }
            else
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
                if (!result.Succeeded)
                {
                    List<string> error = new List<string>();
                    error.Add("User is not found, password or email isn't correct!");
                    return new ResultErrorDto
                    {
                        Status = 400,
                        Message = "user not found!",
                        Errors = error
                    };
                }
                else
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    await _signInManager.SignInAsync(user, false);

                    return new ResultLoginDto
                    {
                        Status = 200,
                        Message = "OK",
                        Token = _jwtTokenService.CreateToken(user)
                    };

                }
            }
        }       
        

    }
}