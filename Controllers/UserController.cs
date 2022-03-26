using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FileManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace FileManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private HackDBContext _dbcontext = new HackDBContext();

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
    }
}
