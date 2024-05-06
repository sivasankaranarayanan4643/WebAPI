using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroAPI.Controllers;
using MetroAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MetroApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public BookingController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        } 
      

        [HttpGet]
        public IActionResult GetBookingList()
        {
            return Ok(_dbContext.bookings.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetBookingDetails(int id)
        {
            var booking=_dbContext.bookings.FirstOrDefault(m=>m.BookingID==id);
            if(booking==null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPost]
        public IActionResult PostBooking([FromBody] Booking booking)
        {
            _dbContext.bookings.Add(booking);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}