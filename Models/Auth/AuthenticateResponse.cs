using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileManager.Models.Auth
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(UserData user, string token)
        {
            Id = user.Id;
            Username = user.UserName;
            Token = token;
        }
    }
}
