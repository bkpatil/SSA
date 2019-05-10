import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'accountants',
  templateUrl: './accountants.component.html',
  styleUrls: ['./accountants.component.scss']
})
export class AccountantsComponent implements OnInit {
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
      this.years.push({ id: i });
    };
  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    this.callGrid = false;
    let url = 'admin/getAccountantsByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'admin/removeAccountants';
    this.data.editUrl = 'admin/editAccountant';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId, "designation": "others" };
    this.data.columns = ['profilePic', 'userName', 'employeeId', 'firstName', 'lastName', 'gender', 'address', 'contactNumber', 'email', 'yearJoined', 'totalSalary', 'amountPaid', 'balance'];
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
        field: 'firstName',
        label: 'First Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'lastName',
        label: 'Last Name',
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
        values: [{
          id: 'male'
        }, {
          id: 'female'
        }],
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
        field: 'email',
        label: 'Email',
        element: 'email',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'contactNumber',
        label: 'Contact',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'totalSalary',
        label: 'Salary',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'amountPaid',
        label: 'Amount Paid',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'balance',
        label: 'Balance',
        element: 'number',
        hide: true,
        editable: true,
        update: false
      },
      {
        field: 'rfidTag',
        label: 'rfidTag',
        element: 'input',
        hide: true,
        editable: true,
        update: false
      },
      {
        field: 'yearJoined',
        label: 'Year Joined',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.years,
        date: true,
        update: true
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
        field: 'userName',
        label: 'UserName',
        element: 'input',
        hide: true,
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
      if (!results) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      // "userName": student.employeeId,
      "firstName": student.firstName,
      "lastName": student.lastName,
      "contactNumber": Number(student.contactNumber),
      "email": student.email,
      "address": student.address,
      "gender": student.gender,
      "totalSalary": student.totalSalary,
      "yearJoined": this.dataService.convertDate(student.yearJoined, true),
      "employeeId": student.employeeId,
      "designation": "accountant",
      "password": student.password,
      "amountPaid": student.amountPaid,
      // "balance": student.balance,
      // "rfidTag": student.rfidTag,
      "confirmPassword": student.confirmPassword,
      "businessId": this.dataService.user.businessId,
      "profilePic": student.profilePic
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addAccountant";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Accountant', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/getAccountantsByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data;
        this.snackBar.open('Accountant Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });
    // this.data.data.push(this.newRecord);
  }

  onDelete(flag) {
    this.snackBar.open('Accountant Record ' + flag + ' Succesfully', 'Ok', {
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
