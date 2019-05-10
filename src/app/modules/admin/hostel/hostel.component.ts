import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.scss']
})
export class HostelComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ value: i });
    };
  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    let url = 'admin/getSectionsByBusinessId';
    this.callGrid = false;
    this.data.url = url;
    this.data.deleteUrl = 'admin/sections/';
    this.data.editUrl = 'admin/editSections';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.deleteMethod = true;
    this.data.columns = ['firstName', 'lastName','contactNumber','email','address','gender','totalSalary','yearJoined','employeeId','designation','rfidTag','qualification','experience','yearOfJoin','password','confirmPassword','userName','dob'];
    this.fields = [
      {
        field: 'firstName',
        label: 'First Name',
        element: 'input',
        remove: true,
        hide: true,
        editable: false,
        update: true
      },
      {
        field: 'lastName',
        label: 'Last Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.courses,
      },
      {
        field: 'contactNumber',
        label: 'Contact NO.',
        element: 'number',
        hide: false,
        editable: true,
        update: true,
        values:this.dataService.departments
      },
      {
        field: 'email',
        label: 'Email',
        element: 'email',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'address',
        label: 'Address',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'gender',
        label: 'Gender',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [{
          id: 'male'
        }, {
          id: 'female'
        }],
        update: true
      },
      {
        field: 'totalSalary',
        label: 'Total Salary',
        element: 'number',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'yearJoined',
        label: 'Year Joined',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'employeeId',
        label: 'Employee ID',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'designation',
        label: 'Designation',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'rfidTag',
        label: 'RFID',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'qualification',
        label: 'Qualification',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'experience',
        label: 'Experience',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'yearOfJoin',
        label: 'Join Year',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'password',
        label: 'Password',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'confirmPassword',
        label: 'Confirm Password',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'userName',
        label: 'User Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'dob',
        label: 'DOB',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.data.data = [];
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
      "course": student.course,
      "department": student.department,
      "semester": student.semester,
      "year": student.year,
      "sectionName": student.sectionName,
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addSections";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Course', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/getSectionsByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        this.snackBar.open('Section Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
        
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Section Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.getData();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

}
