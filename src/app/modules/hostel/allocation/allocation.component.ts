import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss']
})
export class AllocationComponent implements OnInit {
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
    this.data.height = height - 82;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    this.callGrid = false;
    let url = 'hostel/getStudentRoomAllotmentByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'hostel/deleteStudentToRoom';
    this.data.editUrl = 'hostel/updateStudentToRoom';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.fields = [
        {
          field: 'id',
          label: 'Id',
          element: 'input',
          remove: true,
          hide: true,
          editable: false
        },
        {
          field: 'studentId',
          label: 'Student Id',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'studentName',
          label: 'Student Name',
          element: 'input',
          hide: false,
          editable: true,
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
          field: 'phoneNumber',
          label: 'Contact Number',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'parentPhoneNumber',
          label: 'Parent Contact Number',
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
        {
          field: 'year',
          label: 'Year',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: [
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
          ],
          update: true
        },
        {
          field: 'buildingName',
          label: 'Building Name',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'roomNo',
          label: 'Room Number',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'bedNo',
          label: 'Bed Number',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'fees',
          label: 'Fee',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'noOfTerms',
          label: 'No. Of Terms',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'messFees',
          label: 'Mess Fees',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'paidFees',
          label: 'Paid Fees',
          element: 'input',
          hide: false,
          editable: true,
          update: true
        },
        {
          field: 'paymentDate',
          label: 'Payment Date',
          element: 'date',
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
        }, {
          field: 'businessId',
          label: 'Business Id',
          element: 'input',
          hide: true,
          editable: true
        },
        {
          field: 'actions',
          label: 'Actions',
          element: '',
          hide: false,
          editable: true
        }
      ];
this.data.columns = ['id','studentId','studentName','year','course','department','semester','address','phoneNumber','parentName','parentPhoneNumber','buildingName','roomNo','bedNo','fees','messFees','paidFees','paymentDate','nextPaymentDate','noOfTerms'];
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data || [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "studentId": student.studentId,
      "year": student.year,
      "course": student.course,
      "department": student.department,
      "semester": student.semester,
      "buildingName": student.buildingName,
      "roomNo": student.roomNo,
      "bedNo": student.bedNo,
      "fees": student.fees,
      "noOfTerms": student.noOfTerms,
      "messFees": student.messFees,
      "paidFees": student.paidFees,
      "paymentDate": student.paymentDate ? this.dataService.convertDate(student.paymentDate, true) : 0,
      "nextPaymentDate": student.nextPaymentDate ? this.dataService.convertDate(student.nextPaymentDate, true) : 0,
      "studentName": student.studentName,
      "parentName": student.parentName,
      "phoneNumber": student.phoneNumber,
      "parentPhoneNumber": student.parentPhoneNumber,
      "address": student.address,
      "businessId": this.dataService.user.businessId,
    }
    let url = "hostel/addStudentToRoom";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Allocation', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'hostel/getStudentRoomAllotmentByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data || [];
        this.snackBar.open('Allocation Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });

  }

  onDelete(flag) {
    this.snackBar.open('Allocation Record ' + flag + ' Succesfully', 'Ok', {
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
