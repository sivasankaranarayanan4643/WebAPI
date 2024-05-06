using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroAPI.Data;
using MetroAPI.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace MetroApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetUserList()
        {
            return Ok(_dbContext.users.ToList());
        }

        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            var user=_dbContext.users.FirstOrDefault(m=>m.Email==email);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult PostUser([FromBody] User user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{email}")]

        public IActionResult PutUser(string email,[FromBody] User user)
        {
            var userOld=_dbContext.users.FirstOrDefault(m=>m.Email==email);
            if(userOld==null)
            {
                return NotFound();
            }
            userOld.UserName=user.UserName;
            userOld.Password=user.Password;
            userOld.Phone=user.Phone;
            userOld.Balance=user.Balance;
            _dbContext.SaveChanges();
            return Ok();
        }

    }
}