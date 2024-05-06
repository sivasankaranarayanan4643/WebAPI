using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using MedicalAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

namespace MedicalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext ;
        public UserController (ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
        
        public IActionResult GetUsersList()
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
        public IActionResult PutUser( string email ,[FromBody] User user )
        {
            var userold=_dbContext.users.FirstOrDefault(m=>(m.Email==email));
            if(userold==null)
            {
                return NotFound();
            }
            userold.UserName=user.UserName;
            userold.Password=user.Password;
            userold.PhoneNumber=user.PhoneNumber;
            userold.Balance=user.Balance;
            _dbContext.SaveChanges();
            return Ok();
            
        }

        [HttpDelete("{email}")]
        public IActionResult DeleteUser(string email)
        {
            var user=_dbContext.users.FirstOrDefault(m=>m.Email==email);
            if(user==null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}