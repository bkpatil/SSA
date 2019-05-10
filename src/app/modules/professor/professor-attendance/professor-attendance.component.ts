import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'professor-attendance',
  templateUrl: './professor-attendance.component.html',
  styleUrls: ['./professor-attendance.component.scss']
})
export class ProfessorAttendanceComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  button: any;
  newRecord: any = {};
  years: any = [];
  searchFields: any;
  searchFields1; any;
  tempValue: any;
  searchDetails: any;
  studentId: any;
  url: any;
  professor: boolean;
  callTable: any = false;
  students: any = [];
  constructor(private dataService: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    let today = new Date();
    this.button = "Get Attendance";
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
      }, {
        field: 'section',
        label: 'Section',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'A', id: 'A' },
          { name: 'B', id: 'B' }
        ],
        update: true
      },
    ]
    this.searchFields1 = [
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
        values: [
          { name: 'A', id: 'A' },
          { name: 'B', id: 'B' }
        ],
        update: true
      },
      {
        field: 'subjectName',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        values: this.dataService.professorSubjects,
        editable: true,
        update: true
      }
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
    this.data.deletable = false;
  }
  getData() {
    this.callGrid = false;
    this.data.fullDetails = false;
    let url = 'attendance/getAttendance';
    this.data.url = url;
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      }
      // else {
      //   if (results.data.absentCount != null) {
      //     let keys = Object.keys(results.data.absentCount),
      //       dataTemp = [];
      //     for (var i = 0; i < keys.length; i++) {
      //       let obj: any = {};
      //       obj.studentId = keys[i];
      //       obj.absent = results.data.absentCount[keys[i]] + '';
      //       obj.present = results.data.presentCount[keys[i]] + '';
      //       dataTemp.push(obj);
      //     }
      //     this.data.data = dataTemp;
      //     this.data.dynamicColumns = true;
      //     // this.fields = [
      //     //   {
      //     //     field: 'studentId',
      //     //     label: 'Student Id',
      //     //     element: 'input',
      //     //     remove: true,
      //     //     hide: false,
      //     //     editable: false,
      //     //     update: true
      //     //   },
      //     //   {
      //     //     field: 'present',
      //     //     label: 'Days Present',
      //     //     element: 'input',
      //     //     hide: false,
      //     //     editable: true,
      //     //     update: true
      //     //   },
      //     //   {
      //     //     field: 'absent',
      //     //     label: 'Days Absent',
      //     //     element: 'input',
      //     //     hide: false,
      //     //     editable: true,
      //     //     update: true
      //     //   }
      //     // ];

      //   }
      //   else {
      //     this.data.data = [];
      //   }
      // }
      else {
        this.data.data = results;
        let keys = Object.keys(results.data.absentCount),
          dataTemp = [];
        for (var i = 0; i < keys.length; i++) {
          let obj: any = {};
          obj.studentId = keys[i];
          obj.absent = results.data.absentCount[keys[i]] + '';
          obj.present = results.data.presentCount[keys[i]] + '';
          this.data.totalAbsentPercentage = results.data.totalAbsentPercentage;
          this.data.totalPresentPercentage = results.data.totalPresentPercentage;
          dataTemp.push(obj);
        }
        this.data.details = true;
        this.data.detailsUrl = 'attendance/getAttendanceByStudentId';
        this.data.data = dataTemp;
        this.data.fullDetails = true;
        this.fields = [
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
            field: 'present',
            label: 'Days Present',
            element: 'input',
            hide: false,
            editable: true,
            update: true
          },
          {
            field: 'absent',
            label: 'Days Absent',
            element: 'input',
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

      }
      this.callGrid = true;
      this.newRecord = {};
    });
  }
  getPersonalData() {
    this.callGrid = false;
    // let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'attendance/getAttendanceByEmployeeName',
      objTemp = {
        "businessId": this.dataService.user.businessId,
        "userName": this.dataService.user.userName
      };
    this.data.fullDetails = true;
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
        this.searchDetails = results.data;
        this.studentId = results.data.employeeId;

        this.data.data = [results.data];
        this.data.fullDetails = true;
      }
      this.fields = [];
      this.data.dynamicColumns = true;
      // this.data.columns = ['absentCount', 'presentCount', 'totalAbsentPercentage', 'totalPresentPercentage', 'year'];
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

      this.newRecord = {};
      this.callGrid = true;
    });
  }
  onSearch(student) {
    if (!student)
      student = this.tempValue;
    else
      this.tempValue = student;
    let temp = {
      "year": student.year || '',
      "semester": student.semester || '',
      "course": student.course || '',
      "department": student.department || '',
      "businessId": this.dataService.user.businessId,
      "section": student.section
    }
    this.data.objTemp = temp;
    this.getData();
  }
  reportAttendance(data) {
    var temp1 = {
      "department": data.department,
      "semester": data.semester,
      "year": data.year,
      "course": data.course,
      "section": data.section,
      "subject": data.subjectName
    };
    this.dataService.getData('attendance/getStudents', temp1).subscribe(results => {
      if (!results || results.code === -1) {
        //this.data.data = [];
      }
      else {
        for (let i = 0; i < results.data.length; i++) {
          var temp = {
            SNo: i + 1,
            studentId: results.data[i].studentId,
            subjectName: results.data[i].subject,
            date: new Date().toISOString().slice(0, 10),
            attendance: ''
          }
          this.students.push(temp);
        }
        this.callTable = true;
      }
    });

  }
  postAttendance() {
    var students = [];

    for (let i = 0; i < this.students.length; i++) {
      var temp = {
        "studentIdList": [this.students[i].studentId],
        "semester": this.newRecord.semester,
        "year": this.newRecord.year,
        "section": this.newRecord.section,
        "subject": this.students[i].subjectName,
        "date": this.students[i].date,
        "attendance": this.students[i].attendance === 1 ? 'P' : 'A',
        "department": this.newRecord.department,
      }
      this.dataService.getData('attendance/addSubjectAttendance', temp).subscribe(results => {
        if (!results || results.code === -1) {
          //this.data.data = [];
        }
        else { }
      });
    }
    this.callTable = false;
    this.students = [];
    this.newRecord = {};
    this.flip();
    this.snackBar.open('Attandance Reported Succesfully', 'Ok', {
      duration: 5000,
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
    });
  }
}
