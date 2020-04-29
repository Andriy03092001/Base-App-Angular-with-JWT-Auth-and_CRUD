using Microsoft.AspNetCore.Identity;
using Project_P34.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Project_P34.API_Angular.Helper
{
    public class CustomEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value,
            ValidationContext validationContext)
        {
            if (value != null)
            {
                var service = (UserManager<User>)validationContext
                         .GetService(typeof(UserManager<User>));


                var user = service.FindByEmailAsync(value.ToString())
                    .Result;

                if (user != null)
                {
                    return new ValidationResult(null);
                }
                return ValidationResult.Success;
            }
            return new ValidationResult(null);
        }
    }
}
