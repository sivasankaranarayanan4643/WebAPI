using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Image_Api.Data
{
    [Table("images",Schema ="public")]
    public class Users
    {
        [Key]
        public int ID { get; set; }
        public byte[] Images { get; set; }
        public string Name { get; set; }
    }
}