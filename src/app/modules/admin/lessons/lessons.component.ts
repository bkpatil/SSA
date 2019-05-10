import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  searchFields: any;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  tempValue: any;
  showSearch: boolean = true;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
    this.data.deleteUrl = 'professor/deleteLesson';
    this.data.editUrl = 'professor/updateLesson';
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'name',
        label: 'Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'businessId',
        label: 'businessId',
        element: 'input',
        hide: true
      },
      {
        field: 'topic',
        label: 'Topic',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },{
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
        field: 'subject',
        label: 'Subject',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.subjects
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true,
        update: false
      }
    ]
    this.newRecord = {};
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.getData();
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
    let url = 'professor/getAllLessonsByBusinessId';
    this.data.url = url;
    this.data.objTemp = { businessId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
        this.data.columns = ['id','department','course','name','semester','subject','topic','year'];
      this.callGrid = true;
    });
  }

  addNewStudent(student) {
    let temp =  {
      "name":student.name,
      "topic":student.topic,
      "year":student.year,
      "semester":student.semester,
      "course":student.course,
      "subject":student.subject,
      "department":student.department,
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "professor/addLesson";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Lessons', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.getData();
      this.newRecord = {};
      this.flip();
      this.dataService.getDetails();
    });
  }

  onDelete(flag) {
    this.snackBar.open('Lessons ' + flag + ' Succesfully', 'Ok', {
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
