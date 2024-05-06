using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroAPI.Data
{
    [Table("tickets",Schema ="public")]
    public class Ticket
    {
        [Key]
        public int? TicketID { get; set; }
        public string? FromLocation { get; set; }
        public string? ToLocation { get; set; }
        public double? TicketFair { get; set; }
    }
}