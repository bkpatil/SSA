import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
import { DataService } from './../../../services/data.service';

@Component({
  selector: 'student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  tile: any = {};
  constructor(private dataService: DataService) { }
  chartConfig: any = {};
  externalConfig: any = {};
  attandanceConfig: any = {};
  internalConfig: any = {};
  feedbackConfig: any = {};
  updates: any = false;
  lowerAttandanceDetails: any = {};
  results: any = {};
  attendance: any = [];
  feedback: any = [];
  internalData: any = [];
  attendanceData: any = [];
  externalData: any = []; notifications: any = [];
  feedbackGrid:any;
  ngOnInit() {
    let externalUrl = 'external/getStudentGraph',
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

    let attendanceUrl = 'attendance/getStudentAttendanceGraph';
    this.dataService.getData(externalUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data && results.data.length) {
        for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: results.data[i].month,
            value: results.data[i].percentage
          };
          this.attendanceData.push(temp);
        }
      }
    });

    let notificationUrl = 'student/viewNotificationsForStudent';
    this.dataService.getData(notificationUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      this.notifications.data = results.data;
      this.notifications.dynamicColumns = true;
      this.notifications.height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 3;
      this.notifications.width = $('.mat-grid-tile')[4].offsetWidth;
      this.notifications.showFilter = false;
      this.notifications.showFooter = false;
      this.notifications.fields = [];
      this.updates = true;
    });

    let internalUrl = 'internals/getStudentGraph';
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

    this.tile.color = 'white';
    let url = 'student/viewNotice';
    this.dataService.getData(url, { "businessId": this.dataService.user.businessId }).subscribe(results => {
      if (!results || results.code === -1) {
        this.updates = [];
        return;
      }
      this.updates = results.data;
    });
    let allExternal = 'external/getExternalMarksById',
      allInternal = 'student/viewInternalResults',
      temp = {
        "studentId": this.dataService.user.businessId
      }
    this.dataService.getData(allExternal, temp).subscribe(results => {
      if (!results || results.code === -1) {
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
    let feedbackUrl = 'student/viewStudentFeedBack';
    this.feedbackGrid = false;
    this.dataService.getData(feedbackUrl, { "studentId": this.dataService.user.userName }).subscribe(results => {
      if (!results || results.code === -1) {
        this.feedback = [];
        return;
      }
      this.feedback = results.data;
      this.feedbackConfig.data = results.data;
      this.feedbackConfig.dynamicColumns = true;
      this.feedbackConfig.height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 3;
      this.feedbackConfig.width = $('.mat-grid-tile')[3].offsetWidth;
      this.feedbackConfig.showFilter = false;
      this.feedbackConfig.showFooter = false;
      this.feedbackConfig.fields = [];
      this.feedbackGrid = true;
    });
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
      width: $('.mat-grid-tile')[1].offsetWidth,
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
        data: this.processChartData(this.attendanceData, true)
        // data: this.processChartData([
        //   {
        //     label: 'January',
        //     value: '46'
        //   },
        //   {
        //     label: 'February',
        //     value: '81'
        //   },
        //   {
        //     label: 'March',
        //     value: '70'
        //   },
        //   {
        //     label: 'April',
        //     value: '79'
        //   },
        //   {
        //     label: 'May',
        //     value: '20'
        //   },
        //   {
        //     label: 'June',
        //     value: '49'
        //   },
        //   {
        //     label: 'July',
        //     value: '85'
        //   },
        //   {
        //     label: 'August',
        //     value: '76'
        //   },
        //   {
        //     label: 'September',
        //     value: '69'
        //   },
        //   {
        //     label: 'October',
        //     value: '39'
        //   },
        //   {
        //     label: 'November',
        //     value: '79'
        //   },
        //   {
        //     label: 'December',
        //     value: '99'
        //   },
        // ])

      }
    };
    // this.feedbackConfig = {
    //   type: 'bar2d',
    //   height: height,
    //   width: $('.mat-grid-tile')[4].offsetWidth,
    //   data: {
    //     chart: {
    //       caption: 'Feedback About Professors',
    //       //subCaption: 'Class Wise Results',
    //       //numberPrefix: '%',
    //       //numberSuffix: '%',
    //       //'theme': 'ocean'
    //       "theme": "fint",
    //       usePlotGradientColor: 0
    //     },
    //     data: this.processChartData([
    //       {
    //         label: 'Professor 1',
    //         value: '75'
    //       },
    //       {
    //         label: 'Professor 2',
    //         value: '45'
    //       },
    //       {
    //         label: 'Professor-A',
    //         value: '70'
    //       },
    //       {
    //         label: 'Professor-B',
    //         value: '82'
    //       },
    //       {
    //         label: 'Professor-X',
    //         value: '37'
    //       }
    //     ])
    //   }
    // };
    this.lowerAttandanceDetails = {
      height: height,
      width: $('.mat-grid-tile')[3].offsetWidth,
      showFilter: false,
      showFooter: false,
      fields: [
        { field: 'SNo', label: 'S.Id' },
        { field: 'Name', label: 'Name' },
        { field: 'Branch', label: 'Branch' },
        { field: '%', label: 'Percentage' },
      ],
      data: [
        { "SNo": "1", "Name": "Student 1", "Branch": "ECE", "%": "42" },
        { "SNo": "2", "Name": "Student 2", "Branch": "CSE", "%": "45" },
        { "SNo": "3", "Name": "Student 3", "Branch": "EEE", "%": "46" },
        { "SNo": "4", "Name": "Student 4", "Branch": "ECE", "%": "49" },
        { "SNo": "5", "Name": "Student 5", "Branch": "CSE", "%": "52" },
        { "SNo": "6", "Name": "Student 6", "Branch": "ECE", "%": "55" },
        { "SNo": "7", "Name": "Student 7", "Branch": "ECE", "%": "60" }
      ]
    };
    this.chartConfig.height = height;
    this.chartConfig.width = width;
  }

}
