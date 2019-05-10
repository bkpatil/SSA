import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';

@Component({
  selector: 'attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.scss']
})
export class AttandanceComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  searchFields: any = [];
  newRecord: any = {};
  years: any = [];
  search: any;
  tempValue: any;
  attendanceTemp: any;
  manual: boolean = false;
  manualFields: any = [];
  newRecord1: any = {};
  constructor(private dataService: DataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.manualFields = [
      {
        field: 'rfid',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'attendance',
        label: 'Attendance',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: [
          { name: 'P', id: 'Present' },
          { name: 'A', id: 'Absent' }
        ],
        update: true
      }, {
        field: 'toDate',
        label: 'Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      }
    ]
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
          { name: 'B', id: 'B' },
          { name: 'C', id: 'C' }
        ],
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
    this.data.updatable = true;
    this.data.deletable = true;
    this.data.fullDetails = true;
    this.data.details = true;
    this.data.detailsUrl = 'attendance/getAttendanceByStudentId';
  }
  getData() {
    let url = 'admin/getStudentsForAttendance';
    this.data.url = url;
    this.callGrid = false;
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      }
      else {
        let dataTemp = [];
        for (var i = 0; i < results.data.length; i++) {
          dataTemp.push({ studentId: results.data[i] });
        }
        this.data.data = dataTemp;
        // this.data.data = results;
        // let keys = Object.keys(results.data.absentCount),
        //   dataTemp = [];
        // for (var i = 0; i < keys.length; i++) {
        //   let obj: any = {};
        //   obj.studentId = keys[i];
        //   obj.absent = results.data.absentCount[keys[i]] + '';
        //   obj.present = results.data.presentCount[keys[i]] + '';
        //   dataTemp.push(obj);
        // }
        // this.data.data = dataTemp;
        // this.data.totalAbsentPercentage = results.data.totalAbsentPercentage;
        // this.data.totalPresentPercentage = results.data.totalPresentPercentage;
        this.dataService.tempObj = this.data.objTemp;
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
        this.data.columns = ['studentId'];
      }
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
      "section": student.section || '',
      "course": student.course || '',
      "department": student.department || '',
      // "currentYear":(new Date()).getFullYear(),
      "businessId": this.dataService.user.businessId
    }
    this.data.objTemp = temp;
    this.getData();
  }

  addManual(details) {
    let temp = {
      "rfid": [details.rfid],
      "attendance": details.attendance,
      "toDate": this.dataService.convertDate(details.toDate, true),
      businessId: this.dataService.user.businessId
    }
    let url = "attendance/addManualAttendance";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Manual Attendance', 'Ok', {
          duration: 5000,
        });
        return;
      } else {
        this.newRecord1 = {};
        this.snackBar.open('Attendance Added Successfully', 'Ok', {
          duration: 5000,
        });
      }
    });
  }
  addNewStudent(student) {
    let temp = {
      "year": student.year || '',
      "semester": student.semester || '',
      "course": student.course || '',
      "department": student.department || '',
      "subjectName": student.subjectName || '',
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addSubjects";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Subject', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.onSearch(temp);
      this.dataService.getDetails();
    });
  }
  reset() {
    this.dataService.getData('attendance/getResetAttendance', {}).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Reseting Attendance', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Attendance Reset Done', 'Ok', {
        duration: 5000,
      });
      this.dataService.getDetails();
    });
  }

  notify() {
    this.dataService.getData('sms/sendAbsentSms', { businessId: this.dataService.user.businessId }).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Notifying Attendance', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Attendance Notified Sucessfully', 'Ok', {
        duration: 5000,
      });
      this.dataService.getDetails();
    });
  }

  onDelete(flag) {
    this.snackBar.open('Subject Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.getData();
  }

  attendanceDetails(data) {
    this.attendanceTemp = data;
    this.attendanceTemp.callGrid = true;
    this.flip();
  }

  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }
}

