using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DTO.Models
{
    public class UserRegisterDTO
    {
        public string fullName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string phoneNumber { get; set; }
        public string address { get; set; }
        public int age { get; set; }
    }
}
