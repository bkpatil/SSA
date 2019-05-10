import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'parent-results',
  templateUrl: './parent-results.component.html',
  styleUrls: ['./parent-results.component.scss']
})
export class ParentResultsComponent implements OnInit {
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
  keys:any;
  values:any;
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
    this.data.objTemp = { "userName": this.dataService.user.userName };
    this.searchFields = [
      {
        field: 'studentId',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
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
        field: 'examName',
        label: 'Exam Name',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.dataService.exams,
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
    let url = this.url;
    this.data.url = url;
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else{
      this.data.data = results.data;
          let keys = Object.keys(results.data);
          let values = keys.map(function (key) {
            return results.data[key];
          });
          let marks = [];
          for (var x = 0; x < keys.length; x++) {
            marks.push(keys[x] + ':' + values[x])
          }
          results.data.marks = marks.join(',');
          this.keys = keys;
          this.values = marks;
        }
      this.data.data = results.data;
      this.data.detailsPopUp = true;
      this.data.dynamicColumns = true;
      this.fields = [];
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
    this.newRecord = {};
  }

  displayResults(type) {
    this.callGrid = false;
    if (type === 'internal') {
      this.url = 'internals/getInternalMarksResultsForParent';
      this.button = " Get Internal Marks";
    }
    else {
      this.url = 'external/getExternalMarksResultsForParent';
      this.button = " Get External Marks";
    }
    this.flip();
  }
  onSearch(student) {
    if (!student)
      student = this.tempValue;
    else
      this.tempValue = student;
    let temp: any = {
      "year": student.year || '',
      "semester": student.semester || '',
      "studentId": student.studentId || '',
      "businessId": this.dataService.user.businessId
    }
    if (this.url === 'internals/getInternalMarksResultsForParent') {
      temp.internalName = student.examName;
    } else {
      temp.externalName = student.examName;
    }
    this.data.objTemp = temp;
    this.getData();
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
