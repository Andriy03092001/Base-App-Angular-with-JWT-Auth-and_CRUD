using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.DataAccess.Entity
{
    public class User : IdentityUser
    {
        public virtual UserMoreInfo UserMoreInfo { get; set; }   
    }
}