import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.scss']
})
export class StudentFeedbackComponent implements OnInit {
  rating: any = {};
  data: any = {};
  height: any;
  i: any;
  fields: any;
  callGrid: boolean = false;
  newRecord: any = {};
  frontVisible: boolean = true;
  department: any;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.height = 400;
    this.getData();
  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
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
    var url = '',
      objTemp = {
        "businessId": this.dataService.user.businessId
      }
    this.callGrid = false;
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    url = 'professor/getStudentFeedBackByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'professor/deleteStudentFeedBack';
    this.data.editUrl = 'professor/updateStudentFeedBack';
    this.data.objTemp = objTemp;
    this.data.columns = ['id', 'studentId', 'subject', 'rating', 'comments', 'commentsgivenby'];
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: false,
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
        field: 'comments',
        label: 'Comments',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'commentsgivenby',
        label: 'Comments Given By',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'subject',
        label: 'Subject',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'rating',
        label: 'Rating',
        element: 'dropdown',
        hide: false,
        editable: false,
        update: true,
        values: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
        ]
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ]
    this.dataService.getData(url, objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results.data;
      this.callGrid = true;
    });
  }
  onDelete(flag) {
    this.snackBar.open('Feedback Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
    this.getData();
  }
  postFeedback(details) {
    let url = '',
      temp = {};
    temp = {
      "studentId": details.studentId,
      "comments": details.comments,
      "commentsgivenby": details.commentsgivenby,
      "subject": details.subject,
      "rating": details.rating,
      "businessId": this.dataService.user.businessId
    }
    url = "professor/addStudentFeedBack";

    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Submitting Feedback', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.newRecord = {};
      this.snackBar.open('Feedback Submitted Succesfully', 'Ok', {
        duration: 5000,
      });
      this.clearFeedback();
    });
  }

  clearFeedback() {
    this.rating = {};
    this.getData();
    this.flip();
  }
}
