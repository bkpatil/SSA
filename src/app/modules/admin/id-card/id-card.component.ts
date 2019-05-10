import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'id-card',
  templateUrl: './id-card.component.html',
  styleUrls: ['./id-card.component.scss']
})
export class IdCardComponent implements OnInit {
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
    this.fields = [
      {
        field: 'profilePic',
        label: 'Photo',
        element: 'image',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'id',
        label: 'Student Id',
        element: 'input',
        editable: false,
        update: true
      },
      {
        field: 'name',
        label: 'Student Name',
        element: 'input',
        editable: false,
        update: true
      },
      {
        field: 'course',
        label: 'Course Name',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.courses
      },
      {
        field: 'department',
        label: 'Department Name',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.departments
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
        update: true,
        values: [
          { name: 'A', id: 'A' },
          { name: 'B', id: 'B' }
        ]
      }
    ];

  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;
  }

  addNewStudent(student) {
    var invoice = '';
    invoice = '<center><table style="width:450px;height:300px;border:1px solid gray;border-radius:4px"><tr><td rowspan="6" style="width:120px"> <img src="' + student.profilePic + '" style="width:100px;height:100px" /></td><td> <b>Student Id</b></td><td>' + student.id + '</td></tr><tr><td> <b>Name</b></td><td>' + student.name + '</td></tr><tr><td> <b>Course</b></td><td>' + student.course + '</td></tr><tr><td> <b>Department</b></td><td>' + student.department + '</td></tr><tr><td> <b>Semester</b></td><td>' + student.semester + '</td></tr><tr><td> <b>Section</b></td><td>' + student.section + '</td></tr></table></center>';
    var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=900,height=700");
    myWindow.document.write(invoice);
    setTimeout(() => {
      myWindow.print();
      this.newRecord = {};
    }, 2000);
  }

  onDelete(flag) {

  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }
}

