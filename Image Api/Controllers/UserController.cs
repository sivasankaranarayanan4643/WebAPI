using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Image_Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace Image_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetUserList()
        {
            return Ok(_dbContext.users.ToList());
        }
        [HttpPost]
        public IActionResult PostUser([FromBody] Users user)
        {
            byte[] bytearray=user.Images.ToArray();
            user.Images=bytearray;
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}