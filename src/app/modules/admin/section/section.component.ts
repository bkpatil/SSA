import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
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
      this.years.push({ value: i });
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
    let url = 'admin/getSectionsByBusinessId';
    this.callGrid = false;
    this.data.url = url;
    this.data.deleteUrl = 'admin/sections/';
    this.data.editUrl = 'admin/editSections';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.deleteMethod = true;
    this.data.columns = ['id', 'course','department','semester','year','sectionName'];
    this.fields = [
      {
        field: 'id',
        label: 'Course Id',
        element: 'input',
        remove: true,
        hide: true,
        editable: false,
        update: true
      },
      {
        field: 'course',
        label: 'Course Name',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: this.dataService.courses,
      },
      {
        field: 'department',
        label: 'Department Name',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values:this.dataService.departments
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
        update: true,
      },
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
        update: true,
      },
      {
        field: 'sectionName',
        label: 'Section Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
        values:this.dataService.departments
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
      debugger
      this.data.data = [];
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results.data;
     this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "course": student.course,
      "department": student.department,
      "semester": student.semester,
      "year": student.year,
      "sectionName": student.sectionName,
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addSections";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Course', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/getSectionsByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        this.snackBar.open('Section Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
        
      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Section Record ' + flag + ' Succesfully', 'Ok', {
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
