import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';

@Component({
  selector: 'student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  @Input() fromAdmin: any;
  @Input() value: any;
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
  gate: boolean;
  endDate: any;
  month: any;
  months: any = [{ id: 0, name: "January" }, { id: 1, name: "February" }, { id: 2, name: "March" }, { id: 3, name: "April" }, { id: 4, name: "May" }, { id: 5, name: "June" }, { id: 6, name: "July" }, { id: 7, name: "August" }, { id: 8, name: "September" }, { id: 9, name: "October" }, { id: 10, name: "November" }, { id: 11, name: "December" }];
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
    if (this.value || this.fromAdmin) {
      this.data.width = 700;
      this.data.height = 500;
    }
  }
  getData() {
    this.callGrid = false;
    // let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'student/getGateAttendanceByDateForStudent',
      objTemp: any = {
        "date": this.dataService.convertDate(new Date, true),
        "userName": this.dataService.user.userName
      };
    if (this.fromAdmin) {
      objTemp.studentId = this.value;
      delete objTemp.userName;
      // objTemp.userName = this.dataService.getObjectBy(this.dataService.studentsId, { studentId: this.value }).userName;
    }
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
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {

        // this.searchDetails = results.data[0];
        // this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
        // this.studentId = this.searchDetails.studentId;
        // var tempData = [];
        // for (var i = 0; i < results.data.length; i++) {
        //   var tempObj = results.data[i];
        //   tempObj.absentCount = tempObj.absentCount[this.searchDetails.studentId];
        //   tempObj.presentCount = tempObj.presentCount[this.searchDetails.studentId];
        //   tempData.push(tempObj);
        // }
        // this.data.data = tempData || [];
        // this.data.fullDetails = true;
        this.data.data = [results.data];
      }
      // this.data.columns = ['absentCount', 'presentCount', 'semester',  'totalPresentPercentage', 'year'];
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
      this.data.dynamicColumns = true;
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
      this.newRecord = {};
      this.callGrid = true;
    });
  }
  searchBy(value) {
    this.showMonth = false;
    this.showDate = false;
    this.inOutTime = false;
    this.gate = false;
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
    else if (value === 'gate') {
      this.gate = true;
    }
    else {
      this.inOutTime = true;
    }
  }
  searchByMonth() {
    this.callGrid = false;
    // let url = 'https://api.myjson.com/bins/128rnq';
    var date = new Date(), y = date.getFullYear(), m = this.month;
    var firstDay: any = new Date(y, m, 1);
    var lastDay: any = new Date(y, m + 1, 0),
      longFormat: any = firstDay * 1,  // dont know what it does internally
      longFormat1: any = lastDay * 1;
    let url = 'student/getGateAttendanceBetweenDatesForStudent',
      objTemp: any = {
        // "businessId": this.dataService.user.businessId,
        "fromDate": longFormat,
        "toDate": longFormat1,
        "userName": this.dataService.user.userName
      };
    if (this.fromAdmin) {
      objTemp.studentId = this.value;
      delete objTemp.userName;
      // objTemp.userName = this.dataService.getObjectBy(this.dataService.studentsId, { studentId: this.value }).userName;
    }
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
this.data.data = [results.data];
        // this.searchDetails = results.data;
        // this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
        // this.studentId = this.searchDetails.studentId;
        // var tempData = [];
        // var tempObj = results.data;
        // tempObj.absentCount = tempObj.absentCount[this.searchDetails.studentId];
        // tempObj.presentCount = tempObj.presentCount[this.searchDetails.studentId];
        // tempData.push(tempObj);
        // this.data.data = tempData || [];
        // this.data.fullDetails = true;
      }
      // this.data.columns = ['absentCount', 'presentCount', 'semester', 'totalPresentPercentage', 'year'];
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
      this.data.dynamicColumns = true;
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  searchByDate() {
    this.callGrid = false;
    let url = 'student/getSubjectWiseAttendanceForStudent',
      date: any = new Date(this.startDate),
      date1: any = new Date(this.endDate),
      longFormat: any = date * 1,  // dont know what it does internally
      longFormat1: any = date1 * 1,  // dont know what it does internally
      objTemp: any = {
        // "businessId": this.dataService.user.businessId,
        "userName": this.dataService.user.userName,
        "subject": this.subject,
        "fromDate": longFormat,
        "toDate": longFormat1
      };
    if (this.fromAdmin) {
      objTemp.studentId = this.value;
      delete objTemp.userName;
      // objTemp.userName = this.dataService.getObjectBy(this.dataService.studentsId, { studentId: this.value }).userName;
    }
    if(this.dataService.user.roleId == 5){
      url = 'student/getSubjectWiseAttendanceForParent';
    }
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {
        this.data.data = results.data;
        // this.searchDetails = results.data;
        // this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
        // this.studentId = this.searchDetails.studentId;
        // var tempData = [];
        // var tempObj = results.data;
        // tempObj.absentCount = tempObj.absentCount[this.searchDetails.studentId];
        // tempObj.presentCount = tempObj.presentCount[this.searchDetails.studentId];
        // tempData.push(tempObj);
        // this.data.data = tempData || [];
        // this.data.fullDetails = true;
      }
      // this.data.columns = ['absentCount', 'presentCount', 'semester', 'totalPresentPercentage', 'year'];
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
      this.data.dynamicColumns = true;
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  searchByInOutByGate() {
    this.callGrid = false;
    let url = 'student/getGateAttendanceByDateForStudent',
      objTemp: any = {
        "userName": this.dataService.user.userName,
        "date": this.dataService.convertDate(this.startDate, true),
      };
    if (this.fromAdmin) {
      url = 'admin/getStudentGateAttendanceByDate';
      // objTemp.userName = this.dataService.getObjectBy(this.dataService.studentsId, { studentId: this.value }).userName;
      objTemp.studentId = this.value;
      delete objTemp.userName;
    }
    if(this.dataService.user.roleId == 5){
      url = 'student/getGateAttendanceByDateForParent';
    }
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

  searchByInOut() {
    this.callGrid = false;
    let url = 'student/getGateAttendanceBetweenDatesForStudent',
      objTemp: any = {
        "userName": this.dataService.user.userName,
        "fromDate": this.dataService.convertDate(this.startDate, true),
        "toDate": this.dataService.convertDate(this.endDate, true),
      };
    if (this.fromAdmin) {
      url = 'admin/viewSubjectAttendanceByDate';
      objTemp.studentId = this.value;
      delete objTemp.userName;
      // objTemp.userName = this.dataService.getObjectBy(this.dataService.studentsId, { studentId: this.value }).userName;
    }
    if(this.dataService.user.roleId == 5){
      url = 'student/getGateAttendanceBetweenDatesForParent';
    }
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {
        this.data.data = [results.data] || [];
        // for(var i=0;i<results.data.date.length;i++){
        //   this.data.data.push(
        //     {
        //       date: results.data.date[i],
        //       attendance: results.data.attendance[i]
        //     }
        //   );
        // }
      }
      this.data.dynamicColumns = true;
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  searchBySubject(subject) {
    this.callGrid = false;
    let url = 'student/viewSubjectAttendanceByDateForStudent',
      objTemp: any = {
        // "businessId": this.dataService.user.businessId,
        "userName": this.dataService.user.userName,
        "subject": this.subject,
        "date": this.dataService.convertDate(this.startDate, true)
      };
    if (this.fromAdmin) {
      objTemp.studentId = this.value;
      delete objTemp.userName;
      // objTemp.userName = this.dataService.getObjectBy(this.dataService.studentsId, { studentId: this.value }).userName;
    }
    if(this.dataService.user.roleId == 5){
      url = 'student/viewSubjectAttendanceByDateForParent';
    }
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1 || !results.data) {
        this.data.data = [];
      } else {
        var temp = [];
        for(var i=0;i<results.data.date.length;i++){
          temp.push(
            {
              date: results.data.date[i],
              attendance: results.data.attendance[i]
            }
          );
        }
        this.data.data = [results.data] || [];
      }
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
