using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.Domain.Interfaces;
using Project_P34.DTO.Models;
using Project_P34.DTO.Models.Results;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IJWTTokenService _jWTTokenService;
        private readonly IConfiguration _configuration;

        public AccountController(
             EFContext context,
             UserManager<User> userManager,
             SignInManager<User> signInManager,
             IJWTTokenService jWTTokenService,
             IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _jWTTokenService = jWTTokenService;
            _configuration = configuration;
        }


        //POST: api/account/register
        [HttpPost("register")]
        public async Task<ResultDTO> Register([FromBody] UserRegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                //Тут буде приісходить ваоідація
                return new ResultDTO
                {
                    Status = 500,
                    Message = "ERROR"
                };
            }
            else
            {
                var user = new User()
                {
                    Email = model.email,
                    UserName = model.email,
                    PhoneNumber = model.phoneNumber
                };

                var userMoreInfo = new UserMoreInfo()
                {
                    Id = user.Id,
                    FullName = model.fullName,
                    Address = model.address,
                    Age = model.age
                };

                var result = await _userManager.CreateAsync(user, model.password);

                if (!result.Succeeded)
                {
                    //Тут беде валыдація
                }
                else if (result.Succeeded)
                {
                    result = _userManager.AddToRoleAsync(user, "User").Result;
                    _context.userMoreInfos.Add(userMoreInfo);
                    _context.SaveChanges();
                }
                
                return new ResultDTO
                {
                    Status = 200,
                    Message = "OK"
                };
            }

        }




    }
}