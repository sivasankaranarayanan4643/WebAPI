using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MetroAPI.Data
{
    [Table("bookings", Schema = "public")]
    public class Booking
    {
        [Key]
        public int? BookingID { get; set; }
        public int? TicketID { get; set; }
        public string? Email { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public int? TicketCount { get; set; }
        public double? TotalPrice { get; set; }
        public DateTime? TravelDate { get; set; }
    }
}