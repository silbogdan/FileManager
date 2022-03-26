using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileManager.Models;
using FileManager.Models.Auth;
using FileManager.Services;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private HackDBContext _dbcontext = new HackDBContext();
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
            _dbcontext = new HackDBContext();
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserData user)
        {
            try
            {
                _dbcontext.UserData.Add(user);
                _dbcontext.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest user)
        {
            var response = _userService.Authenticate(user);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
