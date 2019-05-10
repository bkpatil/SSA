import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
import { DataService } from './../../../services/data.service';

@Component({
  selector: 'parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.scss']
})
export class ParentDashboardComponent implements OnInit {
  tile: any = {};
  constructor(private dataService: DataService) { }
  chartConfig: any = {};
  feedbackConfig: any = {};
  externalConfig: any = {};
  attandanceConfig: any = {};
  internalConfig: any = {};
  performanceConfig: any = {};
  lowerAttandanceDetails: any = {};
  results: any = {};
  attendance: any = [];
  feedback: any = [];
  externalData: any = [];
  internalData: any = [];
  feedbackData: any = [];
  commentsData: any = [];
  show:boolean = false;
  ngOnInit() {

    let externalUrl = 'external/getStudentGraphForParent',
      businessObj = { userName: this.dataService.user.userName };
    this.dataService.getData(externalUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data && results.data.length) {
        for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: results.data[i].year + '-' + results.data[i].semester,
            value: results.data[i].percentage
          };
          this.externalData.push(temp);
        }
      }
    });

    let feedbackUrl = 'student/viewStudentFeedbackForParent';
    this.dataService.getData(feedbackUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        this.feedback = [];
        return;
      }
      if (results.data && results.data.length) {
        for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: results.data[i].subject,
            value: results.data[i].rating
          };
          this.feedback.push(temp);
        }
      }
    });

    let commentsUrl = 'student/viewCommentsForParent';
    this.dataService.getData(commentsUrl, businessObj).subscribe(results => {
      this.show = false;
      if (!results || results.code === -1) {
        this.feedback = [];
        return;
      }
      if (results.data && results.data.length) {
        this.commentsData = results.data;
      }
      this.show = true;
    });

    let internalUrl = 'internals/getStudentGraphForParent';
    this.dataService.getData(internalUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data && results.data.length) {
        for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: results.data[i].year + '-' + results.data[i].semester,
            value: results.data[i].percentage
          };
          this.internalData.push(temp);
        }
      }
    });

    let allExternal = 'external/getExternalMarksById',
      allInternal = 'student/viewInternalResults',
      temp = {
        "studentId": this.dataService.user.businessId
      }
    this.dataService.getData(allExternal, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.results.allExternal = [];
        return;
      }
      this.results.allExternal = results.data;
      // this.callGrid = true;
    });
    this.dataService.getData(allInternal, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.results.allInternal = [];
        return;
      }
      this.results.allInternal = results.data;
      // this.callGrid = true;
    });
    let urlAttendance = 'attendance/getAttendanceByStudentId',
      objTemp = {
        "userName": this.dataService.user.userName,
        "businessId": this.dataService.user.businessId
      };
    this.dataService.getData(urlAttendance, objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.attendance = [];
        return;
      }
      this.attendance = results.data;
    });




    this.tile.color = 'white';
    //this.tile.rowHeight = ($('.sidenav-body')[0].height() / 3 );
  }
  processChartData(data, max?) {
    for (var i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.value < 40) {
        record.color = '#ff0000';
        record.isSliced = "1";
      }
      else if (record.value >= 40 && record.value < 50)
        record.color = '#0000FF';
      else if (record.value >= 50 && record.value < 80)
        record.color = '#FFA500';
      else
        record.color = '#008000';
    }
    return data;
  }
  ngAfterContentChecked() {
    let padding = 60,
      height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 3,
      width = $('.mat-grid-tile')[0].offsetWidth;
    this.tile.rowHeight = height + 'px';
    this.externalConfig = {
      height: height,
      width: $('.mat-grid-tile')[0].offsetWidth,
      type: 'column2d',
      data: {
        chart: {
          caption: 'External Results',
          subCaption: 'Semister Wise Results',
          //numberPrefix: '%',
          numberSuffix: '%',
          //"palette": "1",
          usePlotGradientColor: 0,
          valueFontColor: '#fff',
          placeValuesInside: 1
          //'theme': 'ocean',
        },
        data: this.processChartData(this.externalData, true)
        // data: this.processChartData([
        //   {
        //     label: '1-1',
        //     value: '65',
        //     color: '#f00'
        //   },
        //   {
        //     label: '2-1',
        //     value: '81'
        //   },
        //   {
        //     label: '2-2',
        //     value: '70'
        //   },
        //   {
        //     label: '3-1',
        //     value: '59'
        //   },
        //   {
        //     label: '3-2',
        //     value: '83'
        //   },
        //   {
        //     label: '4-1',
        //     value: '82'
        //   },
        // ])

      }
    };
    this.internalConfig = {
      type: 'bar2d',
      height: height,
      width: $('.mat-grid-tile')[2].offsetWidth,
      data: {
        chart: {
          caption: 'Internal Results',
          //subCaption: 'Class Wise Results',
          //numberPrefix: '%',
          numberSuffix: '%',
          usePlotGradientColor: 0,
          //'theme': 'ocean'
        },
        data: this.processChartData(this.internalData, true)
        // data: this.processChartData([
        //   {
        //     label: 'S1',
        //     value: '39'
        //   },
        //   {
        //     label: 'S2',
        //     value: '81'
        //   },
        //   {
        //     label: 'S3',
        //     value: '49'
        //   },
        //   {
        //     label: 'S4',
        //     value: '79'
        //   },
        //   {
        //     label: 'S5',
        //     value: '83'
        //   },
        //   {
        //     label: 'S6',
        //     value: '82'
        //   },
        // ])

      }
    };
    this.feedbackConfig = {
      height: height,
      width: $('.mat-grid-tile')[0].offsetWidth,
      type: 'bar2d',
      data: {
        chart: {
          caption: 'Feedback Results',
          subCaption: 'Department Wise Feedback',
          //numberPrefix: '%',
          // numberSuffix: '%',
          //"palette": "1",
          usePlotGradientColor: 0,
          valueFontColor: '#fff',
          placeValuesInside: 1
          //'theme': 'ocean',
        },
        data: this.processChartData(this.feedback, true)
        //   data: this.processChartData([
        //     {
        //       label: 'Professors',
        //       value: '65',
        //       color: '#f00'
        //     },
        //     {
        //       label: 'Transport',
        //       value: '81'
        //     },
        //     {
        //       label: 'Hostel',
        //       value: '49'
        //     }
        //   ])
      }
    };
    this.lowerAttandanceDetails = {
      height: height-20,
      width: $('.mat-grid-tile')[1].offsetWidth,
      showFilter: false,
      showFooter: false,
      fields: [
        { field: 'subject', label: 'Subject' },
        { field: 'comments', label: 'Comments' }
      ],
      data: this.commentsData
    };
    // this.performanceConfig = {
    //   type: 'line',
    //   height: height,
    //   width: $('.mat-grid-tile')[2].offsetWidth,
    //   data: {
    //     chart: {
    //       caption: 'Performance Graph',
    //       //subCaption: 'Class Wise Results',
    //       //numberPrefix: '%',
    //       numberSuffix: '%',
    //       usePlotGradientColor: 0,
    //       //'theme': 'ocean'
    //     },
    //     data: this.processChartData([
    //       {
    //         label: '1-1',
    //         value: '65',
    //         color: '#f00'
    //       },
    //       {
    //         label: '2-1',
    //         value: '81'
    //       },
    //       {
    //         label: '2-2',
    //         value: '70'
    //       },
    //       {
    //         label: '3-1',
    //         value: '59'
    //       },
    //       {
    //         label: '3-2',
    //         value: '83'
    //       },
    //       {
    //         label: '4-1',
    //         value: '82'
    //       },
    //     ])
    //   }
    // };
    this.attandanceConfig = {
      type: 'doughnut2d',
      height: height,
      width: $('.mat-grid-tile')[1].offsetWidth,
      data: {
        chart: {
          caption: 'Attandance',
          captionAlignment: 'left',
          "showBorder": "0",
          "use3DLighting": "0",
          "enableSmartLabels": "0",
          "startingAngle": "310",
          "showLabels": "0",
          "showValues": "0",
          "centerLabel": "$label: $value %",
          "centerLabelBold": "0",
          "showTooltip": "1",
          plotToolText: "$label: $value %",
          "decimals": "0",
          "useDataPlotColorForLabels": "1",
          usePlotGradientColor: 0,
          placeValuesInside: 1,
          "pieRadius": height / 2.5
        },
        data: this.processChartData([
          {
            label: 'January',
            value: '46'
          },
          {
            label: 'February',
            value: '81'
          },
          {
            label: 'March',
            value: '70'
          },
          {
            label: 'April',
            value: '79'
          },
          {
            label: 'May',
            value: '20'
          },
          {
            label: 'June',
            value: '49'
          },
          {
            label: 'July',
            value: '85'
          },
          {
            label: 'August',
            value: '76'
          },
          {
            label: 'September',
            value: '69'
          },
          {
            label: 'October',
            value: '39'
          },
          {
            label: 'November',
            value: '79'
          },
          {
            label: 'December',
            value: '99'
          },
        ])
      }
    };
    this.chartConfig.height = height;
    this.chartConfig.width = width;
  }

}

