import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.component.html',
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord:any = {};
  years:any =[];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }
   
  ngOnInit() {
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
    let url = 'admin/getCanteenManagerByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'admin/removeOtherEmployees';
    this.data.editUrl = 'admin/editOtherEmployees';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = {businessId: this.dataService.user.businessId, "designation":"others"};
      this.data.columns = ['profilePic', 'employeeId', 'firstName', 'lastName', 'gender', 'address', 'dob', 'contactNumber', 'email', 'yearJoined', 'totalSalary','documents'];
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
          remove:true,
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
          field: 'dob',
          label: 'Date Of Birth',
          element: 'date',
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
          field: 'documents',
          label: 'Documents',
          element: 'fileUpload',
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

      // address:"hyderabad"
      // amountPaid:0
      // balance:0
      // businessId:1
      // confirmPassword:null
      // contactNumber:9030152102
      // designation:"TEACHER"
      // dob:7102018
      // email:"viliam@gmail.com"
      // employeeId:"1"
      // firstName:"sahitya"
      // gender:"female"
      // id:4
      // isActive:1
      // lastName:"charitha"
      // password:null
      // profilePic:null
      // subjects:null
      // totalSalary:3000
      // userName:"kits"
      // yearJoined:2015
      // yearToTeach:null
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
      "documents": student.documents,
      "totalSalary": student.totalSalary,
      "profilePic": student.profilePic,
      "yearJoined": this.dataService.convertDate(student.yearJoined,true),
      "employeeId": student.employeeId,
      "password": student.password,
      "amountPaid": student.amountPaid,
      "confirmPassword": student.confirmPassword,
      "designation": "others",
      "businessId": this.dataService.user.businessId,
      "dob": this.dataService.convertDate(student.dob, true)
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addCanteenManager";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Employee', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/getCanteenManagerByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data;
        this.snackBar.open('Employee Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Employee Record ' + flag + ' Succesfully', 'Ok', {
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
