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
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetBookList()
        {
            return Ok(_dbContext.books.ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            var book=_dbContext.books.FirstOrDefault(m=>m.BookID==id);
            if(book==null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public IActionResult PostBooks([FromBody] BookDetails book)
        {
            _dbContext.books.Add(book);
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutBooks(int id,[FromBody] BookDetails book)
        {
            var bookOld=_dbContext.books.FirstOrDefault(m=>m.BookID==id);
            if(bookOld==null)
            {
                return NotFound();
            }
            bookOld.BookName=book.BookName;
            bookOld.AuthorName=book.AuthorName;
            bookOld.BookCount=book.BookCount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }

}