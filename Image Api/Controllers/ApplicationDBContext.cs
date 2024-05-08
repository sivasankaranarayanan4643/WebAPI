using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Image_Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Image_Api.Controllers
{
   
    public class ApplicationDBContext: DbContext,IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<Users> users{get; set;}
    }
}