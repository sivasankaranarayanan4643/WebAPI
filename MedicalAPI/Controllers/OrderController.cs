using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
        [HttpGet]
        public IActionResult GetOrderList()
        {
            return Ok(_dbContext.orders.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult PostOrder([FromBody] Order order)
        {

            _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult PutOrder(int id,[FromBody] Order order)
        {
            var orderold=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(orderold==null)
            {
                return NotFound();
            }
            orderold.MedicineID=order.MedicineID;
            orderold.Email=order.Email;
            orderold.MedicineName=order.MedicineName;
            orderold.ExpiryDate=order.ExpiryDate;
            orderold.Quantity=order.Quantity;
            orderold.Price=order.Price;
            orderold.OrderStatus=order.OrderStatus;
            _dbContext.SaveChanges();
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(m=>m.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
            
        }
    }
}