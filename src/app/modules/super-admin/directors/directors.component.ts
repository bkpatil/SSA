import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.scss']
})
export class DirectorsComponent implements OnInit {
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
      this.years.push(i+'');
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
    let url = 'superAdmin/getAdminByBusinessId';
    this.callGrid = false;
    this.data.url = url;
    this.data.deleteUrl = 'superAdmin/removeAdmin';
    this.data.editUrl = 'superAdmin/editAdmin';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.columns = ['profilePic', 'name', 'phoneNumber', 'email', 'address', 'gender', 'salary', 'yearJoined', 'employeeId', 'userName', 'dob', 'branchName'];

    this.fields = [
      {
        field: 'profilePic',
        label: 'Picture',
        element: 'image',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'employeeId',
        label: 'Employee Id',
        element: 'input',
        remove: true,
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'name',
        label: 'Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'phoneNumber',
        label: 'Phone Number',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'email',
        label: 'Email',
        element: 'email',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'address',
        label: 'Address',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'gender',
        label: 'Gender',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: [{ id: 'male', value: 'Male' }, { id: 'female', value: 'Female' },]
      },
      {
        field: 'salary',
        label: 'Salary',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'qualification',
        label: 'Qualification',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'yearJoined',
        label: 'Year Joined',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.years
      },
      {
        field: 'dob',
        label: 'Date Of Birth',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'branchName',
        label: 'Branch Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'userName',
        label: 'UserName',
        element: 'input',
        hide: true,
        editable: true,
        update: false
      },
      {
        field: 'password',
        label: 'Password',
        element: 'input',
        hide: false,
        editable: true,
        update: false
      },
      {
        field: 'confirmPassword',
        label: 'Confirm Password',
        element: 'input',
        hide: false,
        editable: true,
        update: false
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
        debugger
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "name": student.name,
      "phoneNumber": Number(student.phoneNumber),
      "email": student.email,
      "address": student.address,
      "gender": student.gender,
      "salary": Number(student.salary),
      "yearJoined": Number(student.yearJoined),
      "employeeId": student.employeeId,
      "designation": "admin",
      "password": student.password,
      "qualification": student.qualification,
      "confirmPassword": student.confirmPassword,
      // "userName": student.userName,
      "profilePic": student.profilePic,
      "branchName": student.branchName,
      "dob": this.dataService.convertDate(student.dob, true),
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "superAdmin/addAdmin";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Admin', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'superAdmin/getAdminByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.data.data = results.data;
        this.snackBar.open('Admin Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
        this.getData();
        this.flip();

      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Director Record ' + flag + ' Succesfully', 'Ok', {
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

