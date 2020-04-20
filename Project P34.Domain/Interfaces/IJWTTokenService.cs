using Project_P34.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_P34.Domain.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(User user);
    }
}
