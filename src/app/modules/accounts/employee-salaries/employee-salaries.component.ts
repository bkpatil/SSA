import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { FPopupComponent } from '../../../components/fee-popup/popup.component';
import { StudentFeeRecordComponent } from "../../../components/student-fee-record/student-fee-record.component";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'employee-salaries',
  templateUrl: './employee-salaries.component.html',
  styleUrls: ['./employee-salaries.component.scss']
})
export class EmployeeSalariesComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  button: any;
  newRecord: any = {};
  years: any = [];
  searchFields: any;
  tempValue: any;
  url: any;
  noData: any = false;
  studentId: any;
  year: any = (new Date()).getFullYear();
  displayedColumns: string[] = ['empId','anualPackage','monthPackage','paidSalary','pendingSalary','action']
  // displayedColumns: string[] = ['studentNo','studentId','studentName','year','course','department','courseFee','hostel','transport','paidFee','due','action']
  constructor(private dataService: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [];
    this.newRecord = {};
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.searchFields = [
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
        field: 'studentId',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
    ]
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
    this.data.updatable = false;
    this.data.deletable = true;
  }
  search1() {
    if (!this.year) {
      this.year = (new Date()).getFullYear();
    }
    this.dataService.getRequest('accounts/getStudentFeeDetailsByStudentId/' + this.studentId + '/' + this.year).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
        this.noData = true;
      } else {
        this.data.data = results.data;
        this.callGrid = true;
      }

    });

  }
  edit() {
    this.callGrid = false;
    var data = this.data.data;
    data.year = this.data.objTemp.year;
    data.semester = this.data.objTemp.semester;
    data.amountPaid = this.data.data['Amount Paid'];
    data.nextPaymentDate = this.data.data['Next PaymentDate'];
    data.amountToBePaid = this.data.data['Pending Amount'];
    data.edit = true;
    let dialogRef = this.dialog.open(FPopupComponent, {
      data: data
    });
  }
  pay() {
    // this.callGrid = false;
    // var data = this.data.data;
    // data.year = this.data.objTemp.year;
    // data.semester = this.data.objTemp.semester;
    // data.amountPaid = this.data.data['Amount Paid'];
    // data.nextPaymentDate = this.data.data['Next PaymentDate'];
    // data.amountToBePaid = this.data.data['Pending Amount'];
    let dialogRef = this.dialog.open(FPopupComponent, {
      data:{}
    });
  };
  record(){
    const dialogRef = this.dialog.open(StudentFeeRecordComponent, {
      width: "25%",
      data: {}
    })
  };
  getData() {
    let url = this.url;
    this.data.url = url;
    this.callGrid = false;
    this.noData = false;
    var temp = {
      "studentId": this.data.objTemp.studentId,
      "businessId": this.dataService.user.businessId,
      "semesterPayment": [{
        "year": this.data.objTemp.year,
        "semester": this.data.objTemp.semester
      }]
    }
    this.dataService.getData('accounts/getStudentFeeDetails', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
        this.noData = true;
      } else {
        this.data.data = results.data;
        this.callGrid = true;
      }

    });
  }

  onSearch(student) {
    if (!student)
      student = this.tempValue;
    else
      this.tempValue = student;
    let temp: any = {
      "studentId": student.studentId || '',
      "year": student.year || '',
      "semester": student.semester || '',
      "course": student.course || '',
      "department": student.department || '',
      "businessId": this.dataService.user.businessId
    }
    this.data.objTemp = temp;
    this.getData();
  }


  addNewStudent(student) {
    this.data.data.push(this.newRecord);
    this.flip();
    this.dataService.getDetails();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
    this.newRecord = {};
  }

  displayResults(type) {
    this.callGrid = false;
    if (type === 'internal') {
      this.url = 'internals/getListOfInternalPercentages';
      this.button = " Get Internal Marks";
    }
    else {
      this.url = 'external/getListOfExternalPercentages';
      this.button = " Get External Marks";
    }
    this.flip();
  }


  openSearch() {
    let dialogRef = this.dialog.open(FPopupComponent, {
      data: {
        fields: this.searchFields,
        data: {},
        gridData: this.data,
        button: 'View',
        url: 'https://api.myjson.com/bins/rgabi',
        name: 'Search'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.callGrid = false;
      //this.data = result.gridData;
    });
  }
}
