import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';

@Component({
  selector: 'parent-attendance',
  templateUrl: './parent-attendance.component.html',
  styleUrls: ['./parent-attendance.component.scss']
})
export class ParentAttendanceComponent implements OnInit {
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
  months: any = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(private dataService: DataService, public dialog: MatDialog, ) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ value: i });
    };
    this.search.month = "January";
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
  }
  getData() {
    this.callGrid = false;
    // let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'attendance/getAttendanceForParents',
      objTemp = {
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
      if (!results || results.code === -1) {
        this.data.data = [];
      } else {
        this.searchDetails = results.data[0];
        this.searchDetails.studentId = Object.keys(this.searchDetails.presentCount)[0];
        this.data.data = results.data[0].attendances;
        this.details = true;
      }
      //this.fields = [];
      //this.data.dynamicColumns = true;
      // this.data.detailsUrl = 'https://api.myjson.com/bins/1dtjle';
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
