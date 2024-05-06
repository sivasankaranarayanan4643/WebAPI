using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 

namespace MedicalAPI.Data
{
    [Table("medicines", Schema = "public")]
    public class Medicines
    {
        [Key]
        public int? MedicineID { get; set; }
        public string? MedicineName { get; set; }
        public int? MedicineQuantity { get; set; }
        public double? MedicinePrice { get; set; }
        public DateTime? ExpiryDate { get; set; }
    }
}