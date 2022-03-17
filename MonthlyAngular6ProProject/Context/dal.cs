using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MonthlyAngular6ProProject.Context
{
    public class Department
    {
        [Key]
        public string departmentid { get; set; }
        public string subjectname { get; set; }
        public string location { get; set; }
        public IList<Student> students { get; set; }
    }

    public partial class Student
    {
        [Key]
        public string studentid { get; set; }
        public string studentname { get; set; }
        public string studentclass { get; set; }
        [ForeignKey("department")]
        public string departmentid { get; set; }

        public string gender { get; set; }
        public Boolean present { get; set; }
        public DateTime date { get; set; }
        public string picture { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public Nullable<decimal> payment { get; set; }

        public Department department { get; set; }

    }
}
