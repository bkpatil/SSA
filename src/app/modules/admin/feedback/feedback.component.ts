import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PopupComponent } from '../../../components/popup/popup.component';


@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  searchFields: any = [];
  newRecord: any = {};
  years: any = [];
  search: any;
  feedbackConfig: any;
  department: any;
  rowHeight: any;
  callGraph: boolean = false;
  constructor(private dataService: DataService, public dialog: MatDialog, ) { }

  dataChanged(event) {
    let department = event.value;
    let urlTemp = '';
    this.data.dynamicColumns = true;
    if (department === 1) {
     urlTemp = 'student/viewFeedbackByBusinessId';
    } else if (department === 2) {
      this.fields = [
        {
          field: 'B.No',
          label: 'Bus Number',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'D.Name',
          label: 'Driver Name',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Driving',
          label: 'Driving',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Timing',
          label: 'Timing',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Behaviour',
          label: 'Behaviour',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Condition',
          label: 'Condition',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Feedback',
          label: 'Feedback',
          element: 'input',
          hide: false,
          editable: false
        }
      ];
      urlTemp = 'bus/getTransportFeedbackByBusinessId';
    }
    else if (department === 3) {
      this.fields = [
        {
          field: 'Food',
          label: 'Food',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Rooms',
          label: 'Rooms',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Facilities',
          label: 'Facilities',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Washrooms',
          label: 'Washrooms',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'Overall',
          label: 'Overall Feedback',
          element: 'input',
          hide: false,
          editable: false
        }
      ]
      urlTemp = 'hostel/viewHostelFeedbackByBusinessId';
    }
    this.getData(urlTemp);
  }
  ngOnInit() {
    this.user = this.dataService.user;
    this.department = [
      { name: 'Teaching', value: 1 },
      { name: 'Transport', value: 2 },
      { name: 'Hostel', value: 3 }
    ];
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.dataService.getData('feedback/getTotalFeedBack', this.data.objTemp).subscribe(results => {
      if (results.code !== -1) {
        results = results.data;
        this.feedbackConfig = {};
        let height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop) / 2;
        
        this.rowHeight = height + 'px';
        this.feedbackConfig = {
          type: 'bar2d',
          height: height,
          width: 700,
          data: {
            chart: {
              caption: 'Feedback',
              //subCaption: 'Class Wise Results',
              //numberPrefix: '%',
              //numberSuffix: '%',
              //'theme': 'ocean'
              "theme": "fint",
              usePlotGradientColor: 0
            },
            data: this.processChartData([
              {
                label: 'Teaching',
                value: results.professorFeedbackTotal !== null ? results.professorFeedbackTotal : 0
              },
              {
                label: 'Transport',
                value: results.transportFeedbackTotal !== null ? results.transportFeedbackTotal : 0
              },
              {
                label: 'Hostel',
                value: results.hostelFeedbackTotal !== null ? results.hostelFeedbackTotal : 0
              }
            ])
          }
        };
      }
      this.callGraph = true;
    });


  }

  processChartData(data) {
    for (var i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.value < 3) {
        record.color = '#ff0000';
        record.isSliced = "1";
      }
      else if (record.value >= 3 && record.value < 4)
        record.color = '#0000FF';
      else if (record.value >= 4 && record.value < 5)
        record.color = '#FFA500';
      else
        record.color = '#008000';
    }
    return data;
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
    this.data.details = false;
  }
  getData(urlTemp) {
    let url = urlTemp;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        if (results.data)
          this.data.data = results.data;
        else this.data.data = [];
        this.fields = [];
      this.data.dynamicColumns = true;
      this.data.excludeFields = ['feedback'];
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
}
