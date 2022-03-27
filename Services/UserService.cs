using FileManager.Helpers;
using FileManager.Models;
using FileManager.Models.Auth;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FileManager.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        UserData GetById(int id);
        String EncryptPassword(string passowrd);
    }

    public class UserService : IUserService
    {
        HackDBContext _dbcontext;
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, HackDBContext dBContext)
        {
            _appSettings = appSettings.Value;
            _dbcontext = dBContext;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            UserData user = _dbcontext.UserData.SingleOrDefault(x => x.UserName == model.Username && x.Password == model.Password);

            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public UserData GetById(int id)
        {
            return _dbcontext.UserData.FirstOrDefault(x => x.Id == id);
        }

        public string EncryptPassword(string password)
        {
            Byte[] inputBytes = Encoding.UTF8.GetBytes(password);

            Byte[] hashedBytes = (new SHA256CryptoServiceProvider()).ComputeHash(inputBytes);

            return BitConverter.ToString(hashedBytes);
        }

        // helper methods

        private string generateJwtToken(UserData user)
        {
            List<PermissionsModel> claimPermissions = new List<PermissionsModel>();
            var permissions = _dbcontext.UserPermission.Where(p => p.IdUser == user.Id).Select(x => new PermissionsModel(
                _dbcontext.ServerData.FirstOrDefault(sd => sd.Id == x.IdServer).HostName,
                _dbcontext.ServerData.FirstOrDefault(sd => sd.Id == x.IdServer).Ip));
            // generate token that is valid for 7 days
            List<object> claimPermissionsFinal = new List<object>();

            foreach (var item in permissions)
            {
                claimPermissionsFinal.Add(new
                {
                    hostname = item.HostName,
                    ip = item.Ip
                });
            }
            var permissionJson = Newtonsoft.Json.JsonConvert.SerializeObject(claimPermissionsFinal);
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()),
                new Claim("hosts", permissionJson)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
