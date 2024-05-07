using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryApi.Data;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetBorrowList()
        {
            return Ok(_dbContext.borrows.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetBorrow(int id)
        {
            var borrow=_dbContext.borrows.FirstOrDefault(m=>m.BorrowID==id);
            if(borrow==null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }
        [HttpPost]
        public IActionResult PostBorrow([FromBody] BorrowDetails borrow)
        {
            _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutBorrow(int id,[FromBody] BorrowDetails borrow)
        {
            var borrowOld=_dbContext.borrows.FirstOrDefault(m=> m.BorrowID==id);
            if(borrowOld==null)
            {
                return NotFound();
            }
            borrowOld.BookID=borrow.BookID;
            borrowOld.BorrowedDate=borrow.BorrowedDate;
            borrowOld.UserID=borrow.UserID;
            borrowOld.Status=borrow.Status;
            borrowOld.PaidFineAmount=borrow.PaidFineAmount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}