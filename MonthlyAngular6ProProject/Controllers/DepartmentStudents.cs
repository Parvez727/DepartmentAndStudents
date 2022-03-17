using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MonthlyAngular6ProProject.Context;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace MonthlyAngular6ProProject.Controllers
{
    public class DepartmentStudents : Controller
    {
        private MyDbContext db;
        private IHostingEnvironment _HostEnvironment;

        public DepartmentStudents(MyDbContext _db, IHostingEnvironment HostEnvironment)
        {
            db = _db;
            _HostEnvironment = HostEnvironment;
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormFile files)
        {
            string filename =
                ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');
            filename = this.EnsureCorrectFilename(filename);
            using (FileStream output = System.IO.File.Create(this.GetPathAndFilename(filename)))
                await files.CopyToAsync(output);
            return Ok();
        }

        private string GetPathAndFilename(string filename)
        {
            return Path.Combine(_HostEnvironment.WebRootPath, "Uploads", filename); 
        }

        private string EnsureCorrectFilename(string filename)
        {
            if (filename.Contains("\\"))
                filename = filename.Substring(filename.LastIndexOf("\\") + 1);
            return filename;
        }

        public JsonResult InsertDepartment(Department e)
        {
            Department a = new Department();
            a.departmentid = e.departmentid;
            a.subjectname = e.subjectname;
            a.location = e.location;
            db.Departments.Add(a);
            db.SaveChanges();
            return Json(a);
        }

        public JsonResult InsertStudents(Student e)
        {
            Student a1 = new Student();
            a1.studentid = e.studentid;
            a1.studentname = e.studentname;
            a1.studentclass = e.studentclass;
            a1.departmentid = e.departmentid;
            a1.gender = e.gender;
            a1.present = e.present;
            a1.date = DateTime.Parse(e.date.ToShortDateString());
            a1.picture = e.picture;
            a1.payment = (decimal)e.payment;
            db.Students.Add(a1);
            db.SaveChanges();
            return Json(a1);
        }

        public JsonResult DeleteStudentByStudentid(string id)
        {
            List<Student> st5 = db.Students.Where(xx => xx.studentid == id).ToList();
            db.Students.RemoveRange(st5);
            db.SaveChanges();
            return Json("OK");
        }

        public JsonResult DeleteStudent(string id)
        {
            List<Student> st5 = db.Students.Where(xx => xx.departmentid == id).ToList();
            db.Students.RemoveRange(st5);
            db.SaveChanges();
            return Json("OK");

        }

        public JsonResult DeleteAll(string id)
        {
            List<Student> st5 = db.Students.Where(xx => xx.departmentid == id).ToList();
            db.Students.RemoveRange(st5);
            Department st6 = db.Departments.Find(id);
            if(st6 != null)
            {
                db.Departments.Remove(st6);
            }
            db.SaveChanges();
            return Json("OK");
        }


        public JsonResult GetAllDepartment()
        {
            var a = (from d in db.Departments select new { d.departmentid, d.subjectname, d.location });
            return Json(a);
        }

        public JsonResult GetDepartment(string id)
        {
            var a = (from d in db.Departments where d.departmentid == id select new { d.departmentid, d.subjectname, d.location });
            return Json(a);
        }

        public JsonResult GetStudent(string id)
        {
            var a = (from d in db.Students where d.departmentid == id select new { d.studentid, d.studentname, d.studentclass, d.gender, d.present, d.date, d.picture, d.payment });
            return Json(a);
            
        }

        public JsonResult GetAllStudent()
        {
            var a = (from d in db.Students select new { d.studentid, d.studentname, d.studentclass, d.gender, d.present, d.date, d.picture, d.payment, d.departmentid });
            return Json(a);
        }
    }
}
