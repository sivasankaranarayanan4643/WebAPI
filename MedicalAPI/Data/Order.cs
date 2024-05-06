using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 


namespace MedicalAPI.Data
{
    [Table("orders", Schema = "public")]
    public class Order
    {
        [Key]
        public int? OrderID { get; set; }
        public int? MedicineID { get; set; }
        public string? Email { get; set; }
        public string? MedicineName { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? OrderStatus { get; set; }
    }
}