using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Project_IDA.DTO.Models.Result;
using Project_P34.DataAccess;
using Project_P34.DataAccess.Entity;
using Project_P34.DTO.Models;

namespace Project_P34.API_Angular.Controllers
{
    [Route("api/UserManager")]
    [ApiController]
    public class UserManagerController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<User> _userManager;

        public UserManagerController(EFContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<UserItemDTO> getUsers()
        {
            List<UserItemDTO> data = new List<UserItemDTO>();

            var dataFromDB = _context.Users.Where(t => t.Email != "admin@gmail.com").ToList();

            foreach (var item in dataFromDB)
            {
                UserItemDTO temp = new UserItemDTO();
                var moreInfo = _context.userMoreInfos.FirstOrDefault(t => t.Id == item.Id);
                
                temp.Email = item.Email;
                temp.Id = item.Id;
                temp.Phone = item.PhoneNumber;
                if(moreInfo != null)
                {
                    temp.fullName = moreInfo.FullName;
                    temp.Age = moreInfo.Age;
                    temp.Address = moreInfo.Address;
                }
              

                data.Add(temp);
            }

            return data;
        }


        //localhost:12312/api/UserManager/RemoveUser/89as7d89a7a8d09a8sd

        [HttpPost("RemoveUser/{id}")]
        public ResultDto RemoveUser([FromRoute]string id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(t=>t.Id == id);
                var userMoreInfo = _context.userMoreInfos.FirstOrDefault(t => t.Id == id);

                _context.Users.Remove(user);
                if (userMoreInfo!=null)
                {
                    _context.userMoreInfos.Remove(userMoreInfo);
                }
                _context.SaveChanges();

                return new ResultDto
                {
                    Status = 200,
                    Message = "OK"
                };
            }
            catch (Exception e)
            {
                List<string> temp = new List<string>();
                temp.Add(e.Message);

                return new ResultErrorDto
                {
                    Status = 500,
                    Message = "ERROR",
                    Errors = temp
                };
            }
        }

        //localhost:12312/api/UserManager/98d789a789asd7a98sd
        [HttpGet("{id}")]
        public UserItemDTO GetUser([FromRoute]string id)
        {
            var user = _context.Users.FirstOrDefault(t=>t.Id == id);
            var userMoreInfo = _context.userMoreInfos.FirstOrDefault(t => t.Id == id);


            UserItemDTO model = new UserItemDTO();
            model.Id = user.Id;
            model.Email = user.Email;
            model.Phone = user.PhoneNumber;

            if (userMoreInfo!=null)
            {
                model.Age = userMoreInfo.Age;
                model.fullName = userMoreInfo.FullName;
                model.Address = userMoreInfo.Address;
            }

            return model;
        }


        [HttpPost("editUser/{id}")]
        public ResultDto EditUser([FromRoute]string id, [FromBody]UserItemDTO model)
        {
            var user = _context.Users.FirstOrDefault(t => t.Id == id);
            var userMoreInfo = _context.userMoreInfos.FirstOrDefault(t => t.Id == id);

            user.PhoneNumber = model.Phone;
            userMoreInfo.FullName = model.fullName;
            user.Email = model.Email;

            _context.SaveChanges();

            return new ResultDto
            {
                Status = 200,
                Message = "OK"
            };

        }

    }
}