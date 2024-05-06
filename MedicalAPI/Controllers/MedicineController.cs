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
    public class MedicineController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public MedicineController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;
        }
       

        [HttpGet]
        public IActionResult GetMedicineList()
        {
            return Ok(_dbContext.medicines.ToList());
        }

        [HttpGet("{id}")]

        public IActionResult GetMedicine(int id)
        {
            var medicine=_dbContext.medicines.FirstOrDefault(m=>m.MedicineID==id);
            if(medicine==null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        [HttpPost]
        public IActionResult PostMedicine([FromBody]Medicines medicine)
        {
            
            _dbContext.medicines.Add(medicine);
            _dbContext.SaveChanges();
            return Ok();   
        }

        [HttpPut("{id}")]
        public IActionResult PutMedicine(int id,[FromBody] Medicines medicine)
        {
            var medicineOld=_dbContext.medicines.FirstOrDefault(m=>m.MedicineID==id);
            if(medicineOld==null)
            {
                return NotFound();
            }
            medicineOld.MedicineQuantity=medicine.MedicineQuantity;
            medicineOld.ExpiryDate=medicine.ExpiryDate;
            medicineOld.MedicineName=medicine.MedicineName;
            medicineOld.MedicinePrice=medicine.MedicinePrice;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMedicine(int id)  
        {
            var details=_dbContext.medicines.FirstOrDefault(m=>m.MedicineID==id);
            if(details==null)
            {
                return NotFound();
            }
            _dbContext.medicines.Remove(details);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}