import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'outing-pass',
  templateUrl: './outing-pass.component.html',
  styleUrls: ['./outing-pass.component.scss']
})
export class OutingPassComponent implements OnInit {
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
    let url = 'hostel/getStudentTrackByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'hostel/deleteHostelStudentTrack';
    this.data.editUrl = 'hostel/updateHostelStudentTrack';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['id', 'studentId', 'buildingName', 'roomNo', 'reason', 'checkOutDate', 'checkOutTime', 'checkInDate', 'checkInTime'];
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        remove: true,
        editable: true,
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
        field: 'reason',
        label: 'Reason',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'checkOutDate',
        label: 'CheckOut Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'checkOutTime',
        label: 'Checkout Time',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'checkInDate',
        label: 'CheckIn Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'checkInTime',
        label: 'CheckIn Time',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },

      {
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
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data || [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    var d = new Date();
    var n = d.getTime();
    let temp = {
      "studentId": student.studentId,
      "roomNo": student.roomNo,
      "buildingName": student.buildingName,
      "checkInTime": student.checkInTime,
      "checkOutTime": student.checkOutTime,
      "checkInDate": student.checkInDate ? this.dataService.convertDate(student.checkInDate, true) : '',
      "checkOutDate": student.checkOutDate ? this.dataService.convertDate(student.checkOutDate, true) : '',
      "reason": student.reason,
      "businessId": this.dataService.user.businessId,
    }
    let url = "hostel/addHostelStudentTrack";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Record', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'hostel/getStudentTrackByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.data.data = results.data || [];
        this.snackBar.open('Record Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
        var invoice = '<h2><center><b>Outing Pass</b><br/><table style="width:60%;border:1px solid gray;border-radius:4px"><tr><td> <b>Student Id:</b></td><td>' + temp.studentId + '</td></tr> <tr> <td><b> Building Name</b></td> <td>' + temp.buildingName + '</td> </tr> <tr> <td><b>Room No:</b></td> <td>' + temp.roomNo + '</td> </tr> <tr> <td><b>Reason</b></td> <td>' + temp.reason + '</td> </tr> <tr> <td><b>CheckOut Date</b></td> <td>' + this.dataService.convertDate(temp.checkOutDate, false) + '</td> </tr> <tr> <td><b>CheckOut Time</b></td> <td>' + temp.checkOutTime + '</td> </tr> <tr> <td><b>CheckIn Date</b></td> <td>' + this.dataService.convertDate(temp.checkInDate, false) + '</td> </tr> <tr> <td><b>CheckIn Time</b></td> <td>' + temp.checkInTime + '</td> </tr></table></center><br/><center><button class="btn-primary" onclick="window.print()">Print</button></center>';
        var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=500,height=700");
        myWindow.document.write(invoice);
        this.flip();
        this.newRecord = {};
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag,temp) {
    this.snackBar.open('Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    if(flag==='updated'){
      var invoice = '<h2><center><b>Outing Pass</b><br/><table style="width:60%;border:1px solid gray;border-radius:4px"><tr><td> <b>Student Id:</b></td><td>' + temp.studentId + '</td></tr> <tr> <td><b> Building Name</b></td> <td>' + temp.buildingName + '</td> </tr> <tr> <td><b>Room No:</b></td> <td>' + temp.roomNo + '</td> </tr> <tr> <td><b>Reason</b></td> <td>' + temp.reason + '</td> </tr> <tr> <td><b>CheckOut Date</b></td> <td>' + this.dataService.convertDate(temp.checkOutDate, false) + '</td> </tr> <tr> <td><b>CheckOut Time</b></td> <td>' + temp.checkOutTime + '</td> </tr> <tr> <td><b>CheckIn Date</b></td> <td>' + this.dataService.convertDate(temp.checkInDate, false) + '</td> </tr> <tr> <td><b>CheckIn Time</b></td> <td>' + temp.checkInTime + '</td> </tr></table></center><br/><center><button class="btn-primary" onclick="window.print()">Print</button></center>';
        var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=500,height=700");
        myWindow.document.write(invoice);
    }
    this.callGrid = false;
    this.getData();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

}
