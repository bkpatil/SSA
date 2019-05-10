import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
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
      this.years.push(i);
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
    this.data.idCard = true;
  }

  getData() {
    this.callGrid = false;
    //let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'admin/getStudentByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'admin/removeStudent';
    this.data.editUrl = 'admin/editStudent';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.columns = ['profilePic', 'studentId', 'firstName', 'lastName', 'gender', 'parentName', 'address', 'department', 'course', 'semester', 'section', 'year', 'yearPeriod', 'dob', 'email', 'contactNumber', 'documents'];
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
        field: 'studentId',
        label: 'Student Id',
        element: 'input',
        remove: true,
        hide: false,
        editable: false,
        update: true
      },
        {
        field: 'id',
        label: 'Student Id',
        element: 'input',
        hide: true,
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
        field: 'parentName',
        label: 'Parent Name',
        element: 'input',
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
      // {
      //   field: 'semester',
      //   label: 'Semester',
      //   element: 'valuehelp',
      //   dependsOn: 'course',
      //   hide: false,
      //   editable: true,
      //   values: [
      //     { name: '1', id: '1' },
      //     { name: '2', id: '2' }
      //   ]
      // },
      {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: [
          { name: 'A', id: 'A' },
          { name: 'B', id: 'B' }
        ]
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
        field: 'yearPeriod',
        label: 'Year Period',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'currentYear',
        label: 'Current Year',
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
        field: 'totalFees',
        label: 'Total Fees',
        element: 'number',
        hide: true,
        editable: true,
        update: true
      },
      {
        field: 'fee',
        label: 'Fees',
        element: 'number',
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
        label: 'password',
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
      // {
      //   field: 'Docs',
      //   label: 'Documents',
      //   element: 'fileUpload',
      //   hide: false,
      //   editable: true
      // },
      {
        field: 'documents',
        label: 'Documents',
        element: 'fileUpload',
        hide: false,
        editable: true,
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

    let moreFields = [
      {
        field: 'parentUserName',
        label: 'Parent UserName',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'parentPhoneNumber',
        label: 'Parent Phone Number',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'parentEmail',
        label: 'Parent Email',
        element: 'email',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'nextPaymentDate',
        label: 'Next Payment Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'currentPaymentDate',
        label: 'Current Payment Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'noOfTerms',
        label: 'Terms',
        element: 'input',
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
        field: 'scholarshipType',
        label: 'SchloarShip Type',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { id: '', name: 'None' },
          { id: 'govt', name: 'Government' },
          { id: 'private', name: 'Private' }
        ],
        update: true
      },
      {
        field: 'scholarshipAmount',
        label: 'SchloarShip Amount',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      }
    ];
    this.data.addFields = this.fields.concat(moreFields);
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      //address:"kphb"
      // amountBalance:8000
      // amountPaid:2000
      // businessId:1
      // confirmPassword:null
      // contactNumber:9876787898
      // course:"cse"
      // currentPaymentDate:0
      // department:"btech"
      // designation:"STUDENT"
      // dob:1529994977258
      // email:"ss1@gmail.com"
      // fee:0
      // firstName:"pratyusha"
      // gender:"female"
      // id:4
      // isActive:1
      // lastName:"k"
      // nextPaymentDate:1529994977258
      // noOfTerms:2
      // parentEmail:null
      // parentName:null
      // parentPhoneNumber:0
      // parentUserName:null
      // password:null
      // profilePic:null
      // schloarShipAmount:3000
      // schloarShipType:"govt"
      // section:null
      // semester:"1"
      // studentId:"ss2"
      // totalFees:10000
      // userName:"ss2"
      // year:"1"
      // yearPeriod:"2010-2014"

      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "studentId": student.studentId,
      "firstName": student.firstName,
      "lastName": student.lastName,
      "gender": student.gender,
      "email": student.email,
      "contactNumber": student.contactNumber,
      "dob": this.dataService.convertDate(student.dob, true),
      "yearPeriod": student.yearPeriod,
      "section": student.section,
      "fee": student.fee,
      "address": student.address,
      "documents": student.documents,
      "profilePic": student.profilePic,
      // "userName": student.userName,
      "password": student.password,
      "designation": "student",
      "confirmPassword": student.confirmPassword,
      "businessId": this.dataService.user.businessId,
      "noOfTerms": student.noOfTerms,
      "department": student.department,
      "course": student.course,
      "year": student.year,
      "semester": student.semester,
      "amountPaid": student.amountPaid,
      "currentPaymentDate": this.dataService.convertDate(student.currentPaymentDate, true),
      "nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),
      "parentName": student.parentName,
      "scholarshipAmount": student.scholarshipAmount,
      "parentUserName": student.parentUserName,
      "parentPhoneNumber": student.parentPhoneNumber,
      "parentEmail": student.parentEmail,
      "scholarshipType": student.scholarshipType,
      "currentYear": student.currentYear
    }
    let url = "admin/addStudent";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Student', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/getStudentByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data;
        this.snackBar.open('Student Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Student Record ' + flag + ' Succesfully', 'Ok', {
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
