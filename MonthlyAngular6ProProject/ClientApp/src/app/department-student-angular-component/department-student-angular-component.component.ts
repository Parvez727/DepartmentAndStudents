import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {
  HttpClientModule,
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-department-student-angular-component',
  templateUrl: './department-student-angular-component.component.html',
  styleUrls: ['./department-student-angular-component.component.css']
})
export class DepartmentStudentAngularComponentComponent implements OnInit {

  

  ngOnInit() {
  }
  public files: any[];
  students: any;
  sl: number = 0;
  departmentid2: string = "";
  subjectname2: string = "";
  location2: string = "";
  studentid2: string = "";
  studentname2: string = "";
  studentclass2: string = "";
  gender2: string = "";
  present2: boolean = true;
  date2: string = "";
  picture2: string = "";
  payment2: number = 0;
  angForm: FormGroup;

  constructor(public http: HttpClient, private route: ActivatedRoute, private fb: FormBuilder) {
    this.files = [];
    this.http.get('/DepartmentStudents/GetAllStudent')
      .subscribe(data => {
        this.students = data;
        console.log(this.students);
      })
    this.sl = 0;

    this.route.queryParams.subscribe(params => {
      if ('departmentid' == null) {
        this.departmentid2 = params['departmentid'];
        this.departmentchange();
      }
      
    })
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      departmentid: ['', Validators.required],
      subjectname: ['', Validators.required],
      location: ['', Validators.required],
      studentid: ['', Validators.required],
      studentname: ['', Validators.required],
      studentclass: ['', Validators.required],
      gender: ['', Validators.required],
      present: ['', Validators.required],
      date: ['', Validators.required],
      picture: ['', Validators.required],
      payment: ['', Validators.required],

    });
  }


  departmentchange() {
    this.students = [];
    this.subjectname2 = "";
    this.location2 = "";

    this.http.get('/DepartmentStudents/GetDepartment/' + this.departmentid2)
      .subscribe(data => {
        if (data != "") {
          this.subjectname2 = data[0].subjectname;
          this.location2 = data[0].location;
          this.showstudents();
        }
      })
  }

  showstudents() {
    this.http.get('/DepartmentStudents/GetStudent/' + this.departmentid2)
      .subscribe(data => {
        this.students = data;
        console.log(this.students);
      })
    this.sl = 0;
  }


  onFileChanged(event: any) {
    this.files = event.target.files;
    const formData = new FormData();
    formData.append('files', this.files[0]);
    this.http.post('/DepartmentStudents/Post/', formData)
      .subscribe(data => {
        this.picture2 = this.files[0].name
      })
  }


  addStudents(studentid: string, studentname: string, studentclass: string, departmentid: string, gender: string, present: boolean, date: Date, picture: string, payment: number): void {
    this.students.push({
      studentid: studentid,
      studentname: studentname,
      studentclass: studentclass,
      gender: gender,
      present: present,
      date: date,
      picture: this.files[0].name,
      payment: payment,
    })

    this.studentid2 = "";
    this.studentname2 = "";
    this.studentclass2 = "";
    this.gender2 = "";
    this.present2 = true;
    this.date2 = "";
    this.payment2 = 0;

  }


  converDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-')

  }

  show(id: number, studentid1: string, studentname1: string, studentclass1: string, gender1: string, present1: boolean, date1: Date,picture1: string, payment1: number): void {

    this.sl = id;
    this.studentid2 = studentid1;
    this.studentname2 = studentname1;
    this.studentclass2 = studentclass1;
    this.gender2 = gender1;
    this.present2 = present1;
    this.date2 = this.converDate(new Date(date1));
    this.picture2 = picture1;
    this.payment2 = payment1;
  }


  updateStudents(studentid: HTMLInputElement, studentname: HTMLInputElement, studentclass: HTMLInputElement, departmentid: HTMLInputElement, gender: HTMLInputElement,
    present: HTMLInputElement, date: HTMLInputElement, payment: HTMLInputElement): void {
    this.students[this.sl].studentid = studentid.value;
    this.students[this.sl].studentname = studentname.value;
    this.students[this.sl].studentclass = studentclass.value;
    this.students[this.sl].gender = gender.value;
    this.students[this.sl].present = present.value;
    this.students[this.sl].date = date.value;
    this.students[this.sl].payment = payment.value;
    /*this.students[this.sl].departmentid = departmentid.value;*/

    this.http.get('/DepartmentStudents/DeleteStudentByStudentid/' + this.studentid2)
      .subscribe(data => {
        this.http.get('/DepartmentStudents/InsertStudents?studentid=' + studentid.value + '&studentname=' + studentname.value + '&studentclass=' + studentclass.value + '&gender=' + gender.value +
          '&present=' + present.value + '&departmentid=' + departmentid.value + '&date=' + date.value + '&picture=' + this.files[0].name + '&payment=' + payment.value)
          .subscribe(data => {
            window.location.href = 'https://localhost:44393/deptstudent/';
          })
      })


  }


  deleteStudents(): void {
    this.students.splice(this.sl, 1);
    this.studentid2 = "";
    this.studentname2 = "";
    this.studentclass2 = "";
    this.gender2 = "";
    this.present2 = true;
    this.date2 = "";
    this.payment2 = 0;
  }

  deleteAll(): void {
    this.http.get('/DepartmentStudents/DeleteAll/' + this.departmentid2)
      .subscribe(data => {
        window.location.href = 'https://localhost:44393/deptstudent/';
      })
  }



  saveAll(): void {
    var i = 0;
    this.http.get('/DepartmentStudents/DeleteAll/' + this.departmentid2)
      .subscribe(data => {
        var url =
          `departmentid=${this.departmentid2}&subjectname=${this.subjectname2}&location=${this.location2}`;
        this.http.get('DepartmentStudents/InsertDepartment?' + url)
          .subscribe(data => {
            for (let value of this.students) {
              var url1 =
                `studentid=${value.studentid}&studentname=${value.studentname}&studentclass=${value.studentclass}&departmentid=${this.departmentid2}&gender=${value.gender}&present=${value.present}&date=${value.date}&picture=${value.picture}&payment=${value.payment}`;
              this.http.get('/DepartmentStudents/InsertStudents?' + url1)
                .subscribe(data => {
                  i++;
                  if (i == this.students.length) {
                    window.location.href = 'https://localhost:44393/deptstudent/';
                  }
                })
            }
          })
      })

  }



}
