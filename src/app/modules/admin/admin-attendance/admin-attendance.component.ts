import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';

@Component({
  selector: 'admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.scss']
})
export class AdminAttendanceComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  searchFields: any = [];
  newRecord: any = {};
  years: any = [];
  search: any = {};
  searchDetails: any = {};
  details: boolean = false;
  showMonth: boolean;
  studentId: any;
  showDate: boolean;
  startDate: any;
  subject: any;
  showSubject: boolean;
  inOutTime: boolean;
  endDate: any;
  months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(private dataService: DataService, public dialog: MatDialog, ) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ value: i });
    };
    // this.search.month = "January";
    this.searchDetails = {};
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
    this.data.deletable = false;
    this.data.details = true;
    this.search = 'all';
  }
  getData() {
    this.callGrid = false;
    // let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'attendance/getAttendanceByStudentId',
      objTemp = {
        "businessId": this.dataService.user.businessId,
        "userName": this.dataService.user.userName
      };
    this.fields = [
      {
        field: 'date',
        label: 'Date',
        element: 'date',
        hide: false,
        editable: true
      },
      {
        field: 'attendance',
        label: 'Attendance',
        element: 'input',
        hide: false,
        editable: true
      }

    ];
    this.data.detailFields = [
      {
        field: 'Photo',
        label: 'Picture',
        element: 'image',
        hide: false,
        editable: true
      },
      {
        field: 'S.ID',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'SName',
        label: 'Student Name',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'Department',
        label: 'Department',
        element: 'dropdown',
        hide: true,
        editable: true,
        values: this.dataService.departments
      },
      {
        field: 'Course',
        label: 'Course',
        element: 'dropdown',
        dependsOn: 'Department',
        hide: true,
        editable: true,
        values: this.dataService.courses
      },
      {
        field: 'Section',
        label: 'Section',
        element: 'dropdown',
        hide: true,
        editable: true,
        values: [
          { name: 'A', value: 'A' },
          { name: 'B', value: 'B' }
        ]
      }
    ];
    this.data.detailGridFields = [
      {
        field: 'Date',
        label: 'Date',
        element: 'date',
        hide: false,
        editable: false
      },
      {
        field: 'Day',
        label: 'Day Name',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'SName',
        label: 'Student Name',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'SignIn',
        label: 'Sign In',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'SignOut',
        label: 'Sign Out',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'Remarks',
        label: 'Remarks',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: 'print',
        hide: false,
        editable: true
      }
    ];

    this.dataService.getData(url, objTemp).subscribe(results => {
      // if (!results || results.code === -1 || !results.data) {
      //   this.data.data = [];
      // } else {

      //   this.searchDetails = results.data[0];
      //   this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
      //   this.studentId = this.searchDetails.studentId;
      //   var tempData = [];
      //   for (var i = 0; i < results.data.length; i++) {
      //     var tempObj = results.data[i];
      //     tempObj.absentCount = tempObj.absentCount[this.searchDetails.studentId];
      //     tempObj.presentCount = tempObj.presentCount[this.searchDetails.studentId];
      //     tempData.push(tempObj);
      //   }
      //   this.data.data = tempData || [];
      //   this.data.fullDetails = true;
      // }
      // this.data.columns = ['absentCount', 'presentCount', 'semester', 'totalAbsentPercentage', 'totalPresentPercentage', 'year'];
      // this.fields = [
      //   {
      //     field: 'absentCount',
      //     label: 'Absent Count',
      //     element: 'input',
      //     hide: false,
      //     editable: false,
      //     update: true
      //   },
      //   {
      //     field: 'presentCount',
      //     label: 'Present Count',
      //     element: 'input',
      //     hide: false,
      //     editable: false,
      //     update: true
      //   },
      //   {
      //     field: 'totalAbsentPercentage',
      //     label: 'Total Absent %',
      //     element: 'input',
      //     hide: false,
      //     editable: false,
      //     update: true
      //   },
      //   {
      //     field: 'totalPresentPercentage',
      //     label: 'Total Present %',
      //     element: 'input',
      //     hide: false,
      //     editable: false,
      //     update: true
      //   },
      //   {
      //     field: 'semester',
      //     label: 'Semester',
      //     element: 'input',
      //     hide: false,
      //     editable: false,
      //     update: true
      //   },
      //   {
      //     field: 'year',
      //     label: 'Year',
      //     element: 'input',
      //     hide: false,
      //     editable: false,
      //     update: true
      //   },
      //   {
      //     field: 'actions',
      //     label: 'Actions',
      //     element: '',
      //     hide: false,
      //     editable: true
      //   }
      // ];
      // this.data.dynamicColumns = true;
      this.data.attendanceDetails = true;
      this.fields = [
        {
          field: 'studentId',
          label: 'Student Id',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'daysPresent',
          label: 'Days Present',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'daysAbsent',
          label: 'Days Absent',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'percentage',
          label: 'Total Percentage %',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'actions',
          label: 'Actions',
          element: 'attendance',
          hide: false,
          editable: true
        }
      ];
      this.data.data = [
        {
          'studentId': 7469,
          'daysPresent': 34,
          'daysAbsent': 2,
          'percentage': 94
        },
        {
          'studentId': 7470,
          'daysPresent': 36,
          'daysAbsent': 0,
          'percentage': 100
        },
        {
          'studentId': 7471,
          'daysPresent': 30,
          'daysAbsent': 6,
          'percentage': 78
        },
        {
          'studentId': 7472,
          'daysPresent': 32,
          'daysAbsent': 4,
          'percentage': 80
        },
        {
          'studentId': 7473,
          'daysPresent': 18,
          'daysAbsent': 18,
          'percentage': 50
        },
        {
          'studentId': 7474,
          'daysPresent': 26,
          'daysAbsent': 10,
          'percentage': 64
        }
      ];
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
      this.newRecord = {};
      this.callGrid = true;
    });
  }
  searchBy(value) {
    this.showMonth = false;
    this.showDate = false;
    this.inOutTime = false;
    this.showSubject = false;
    if (value === 'month') {
      this.showMonth = true;
    } else if (value === 'all') {
      this.getData();
    } else if (value === 'date') {
      this.showDate = true;
    }
    else if (value === 'subject') {
      this.showSubject = true;
    }
    else {
      this.inOutTime = true;
    }
  }
  searchByMonth() {
    this.callGrid = false;
    // let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'attendance/getAttendanceByStudentId',
      objTemp = {
        "businessId": this.dataService.user.businessId,
        "userName": this.dataService.user.userName
      };
    this.fields = [
      {
        field: 'date',
        label: 'Date',
        element: 'date',
        hide: false,
        editable: true
      },
      {
        field: 'attendance',
        label: 'Attendance',
        element: 'input',
        hide: false,
        editable: true
      }

    ];

    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {

        this.searchDetails = results.data[0];
        this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
        this.studentId = this.searchDetails.studentId;
        var tempData = [];
        for (var i = 0; i < results.data.length; i++) {
          var tempObj = results.data[i];
          tempObj.absentCount = tempObj.absentCount[this.searchDetails.studentId];
          tempObj.presentCount = tempObj.presentCount[this.searchDetails.studentId];
          tempData.push(tempObj);
        }
        this.data.data = tempData || [];
        // this.data.fullDetails = true;
      }
      this.data.columns = ['absentCount', 'presentCount', 'semester', 'totalPresentPercentage', 'year'];
      this.fields = [
        {
          field: 'absentCount',
          label: 'Absent Count',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'presentCount',
          label: 'Present Count',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'totalAbsentPercentage',
          label: 'Total Absent %',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'totalPresentPercentage',
          label: 'Total Present %',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'semester',
          label: 'Semester',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'year',
          label: 'Year',
          element: 'input',
          hide: false,
          editable: false,
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
      //this.data.dynamicColumns = true;
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  searchByDate() {
    this.callGrid = false;
    let url = 'attendance/getAttendanceByDate',
      date: any = new Date(this.startDate),
      date1: any = new Date(this.endDate),
      longFormat: any = date * 1,  // dont know what it does internally
      longFormat1: any = date1 * 1,  // dont know what it does internally
      objTemp = {
        "businessId": this.dataService.user.businessId,
        "studentId": this.dataService.user.userName,
        "startDate": longFormat,
        "endDate": longFormat1
      };
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {
        this.searchDetails = results.data[0];
        this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
        this.studentId = this.searchDetails.studentId;
        var tempData = [];
        for (var i = 0; i < results.data.length; i++) {
          var tempObj = results.data[i];
          tempObj.absentCount = tempObj.absentCount[this.searchDetails.studentId];
          tempObj.presentCount = tempObj.presentCount[this.searchDetails.studentId];
          tempData.push(tempObj);
        }
        this.data.data = tempData || [];
        // this.data.fullDetails = true;
      }
      this.data.columns = ['absentCount', 'presentCount', 'semester','totalPresentPercentage', 'year'];
      this.fields = [
        {
          field: 'absentCount',
          label: 'Absent Count',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'presentCount',
          label: 'Present Count',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'totalAbsentPercentage',
          label: 'Total Absent %',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'totalPresentPercentage',
          label: 'Total Present %',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'semester',
          label: 'Semester',
          element: 'input',
          hide: false,
          editable: false,
          update: true
        },
        {
          field: 'year',
          label: 'Year',
          element: 'input',
          hide: false,
          editable: false,
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
      //this.data.dynamicColumns = true;
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  searchByInOut() {
    this.callGrid = false;
    let url = 'attendance/getInOutTimeByUserName',
      objTemp = {
        "businessId": this.dataService.user.businessId,
        "userName": this.dataService.user.userName,
        "date": this.dataService.convertDate(this.startDate, true)
      };
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {
        this.data.data = [results.data] || [];
      }
      this.data.dynamicColumns = true;
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  searchBySubject(subject) {
    this.callGrid = false;
    let url = 'attendance/getSubjectWiseAttendance',
    objTemp: any = {
      "department": this.dataService.tempObj.department,
      "semester": this.dataService.tempObj.semester,
      "year": this.dataService.tempObj.year,
      "course": this.dataService.tempObj.course,
      "studentId": this.dataService.tempObj.studentId,
      // "businessId": this.dataService.user.businessId,
      "userName": this.dataService.user.userName,
      "subject": this.subject,
      "fromDate": this.dataService.convertDate(this.startDate, true),
      "toDate": this.dataService.convertDate(this.endDate, true)
    };
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {
        this.data.data = results.data|| [];
      }
      // this.data.columns = ['subject','date','inTime','outTime'];
      this.data.columns = [];
      this.data.dynamicColumns = true;
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  addNewStudent(student) {
    this.data.data.push(this.newRecord);
    this.flip();
    this.dataService.getDetails();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }
  refreshGrid() {
    this.callGrid = true;
  }
  openSearch() {
    let dialogRef = this.dialog.open(PopupComponent, {
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
      setTimeout(this.refreshGrid, 1000);
    });
  }
  valueChange() {
  }
}
