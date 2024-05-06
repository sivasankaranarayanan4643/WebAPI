using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace MedicalAPI.Controllers
{
    public class ApplicationDBContext: DbContext,IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    public DbSet<User> users{get; set;}
    public DbSet<Medicines> medicines{get; set;}
    public DbSet<Order> orders{get; set;}
    }
}