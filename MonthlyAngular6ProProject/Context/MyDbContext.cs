using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonthlyAngular6ProProject.Context
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options) { }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
