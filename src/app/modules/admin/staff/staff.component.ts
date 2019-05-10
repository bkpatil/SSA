import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
import { FormGroup,FormBuilder } from "@angular/forms";
@Component({
  selector: 'staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord:any = {};
  years:any =[];
  form: FormGroup;
  staffId: any;
  fileSelected: any;
  constructor(private dataService: DataService,private formBuilder: FormBuilder, private http: HttpClient, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      file: ['']
    });
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({id:i});
    };
  }
  ngAfterContentChecked(){
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width-45;
    this.data.height = height - 82;;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    this.callGrid = false;
    let url = 'admin/viewStaffMapping';
    this.data.url = url;
    this.data.deleteUrl = 'admin/deleteStaffMapping/';
    this.data.deleteMethod = true;
    this.data.editUrl = 'admin/editStaffMapping';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = {businessId: this.dataService.user.businessId};
      this.data.columns = ['id', 'staffId', 'year', 'course', 'department', 'semester', 'section', 'subject'];
      this.fields = [
        {
          field: 'id',
          label: 'Id',
          element: 'input',
          editable: true,
          update: true,
          hide: true,
          remove: true
        },
        {
          field: 'staffId',
          label: 'Staff Id',
          element: 'dropdown',
          hide: false,
          editable: true,
          update: true,
          values: this.dataService.staffId
        },
        {
          field: 'year',
          label: 'Year',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
          ],
          update: true
        },
        {
          field: 'course',
          label: 'Course',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.dataService.courses,
          update: true
        },
        {
          field: 'department',
          label: 'Department',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.dataService.departments,
          update: true
        },
  
        {
          field: 'semester',
          label: 'Semester',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: [
            { name: '1', id: '1' },
            { name: '2', id: '2' }
          ],
          update: true
        },
        {
          field: 'section',
          label: 'Section',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.dataService.sections,
          update: true
        },
        {
          field: 'subject',
          label: 'Subject Name',
          element: 'dropdown',
          hide: false,
          editable: true,
          update: true,
          values: this.dataService.professorSubjects
        },
        {
          field: 'actions',
          label: 'Actions',
          element: '',
          hide: false,
          editable: true
        }
      ];
      debugger
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results.data;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "staffId":student.staffId,
      "department":student.department,
      "course":student.course,
      "year":student.year,
      "semester":student.semester,
      "subject":student.subject,
      "section":student.section,
      "businessId": this.dataService.user.businessId
    }
    let url = "admin/addStaffMapping";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Staff', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/viewStaffMapping';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data;
        this.snackBar.open('Staff Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Staff Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.getData();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  };
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('file').setValue(file);
    }
  };
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('file').value);
    let url = "http://13.233.80.43:8080/collage-management/collage/excel/saveStaffMapping";
    this.http.post(url,formData).subscribe((results)=>{
      this.fileSelected = results;
      this.snackBar.open("Staff Added successfully","OK",{
        duration: 5000
      })
    },(error:HttpErrorResponse)=>{
      if(error.error instanceof Error){
        console.log("client side error"); 
      }else{
        this.snackBar.open("Choose File","OK",{
        duration: 5000
      })
    }
    }
    )
  };
  
}