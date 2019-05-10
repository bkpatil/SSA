import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tile: any = {};
  constructor(private dataService: DataService) { }
  chartConfig: any = {};
  externalConfig: any = {};
  attandanceConfig: any = {};
  internalConfig: any = {};
  feedbackConfig: any = {};
  lowerAttandanceDetails: any = {};
  feedbackData: any = [];
  externalData: any = [];
  internalData: any = [];
  marksData: any = [];
  showGrid : boolean = false;
  ngOnInit() {
    let feedbackUrl = 'feedback/getTotalFeedBack',
      businessObj = { businessId: this.dataService.user.businessId };
    this.dataService.getData(feedbackUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data) {
        // for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: 'Professor',
            value: results.data.professorFeedbackTotal
          };
          this.feedbackData.push(temp);
          var temp = {
            label: 'Transport',
            value: results.data.transportFeedbackTotal
          };
          this.feedbackData.push(temp);
          var temp = {
            label: 'Hostel',
            value: results.data.hostelFeedbackTotal
          };
          this.feedbackData.push(temp);
        // }
      }
    });

    let externalUrl = 'external/getExternalsPercentageGraph';
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

    let marksUrl = 'external/getBranchWiseHighestExternalsPercentage';
    this.dataService.getData(marksUrl, businessObj).subscribe(results => {
      this.showGrid = false;
      if (!results || results.code === -1) {
        return;
      }
      if (results.data) {
        this.marksData = results.data['Top Students from All the Branches '];
      }
      this.showGrid = true;
    });

    let internalUrl = 'internals/getInternalsPercentageGraph';
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
    //this.tile.rowHeight = ($('.sidenav-body')[0].height() / 3 );
  }
  processChartData(data, max?) {
    for (var i = 0; i < data.length; i++) {
      let record = data[i],
        value = max ? data[i].value * 20 : data[i].value;
      if (value < 40) {
        record.color = '#ff0000';
        record.isSliced = "1";
      }
      else if (value >= 40 && value < 50)
        record.color = '#0000FF';
      else if (value >= 50 && value < 80)
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
        //     label: 'CSE-A',
        //     value: '39'
        //   },
        //   {
        //     label: 'CSE-B',
        //     value: '81'
        //   },
        //   {
        //     label: 'ECE-A',
        //     value: '49'
        //   },
        //   {
        //     label: 'ECE-B',
        //     value: '79'
        //   },
        //   {
        //     label: 'EEE-A',
        //     value: '83'
        //   },
        //   {
        //     label: 'EEE-B',
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
    this.feedbackConfig = {
      type: 'bar2d',
      height: height,
      width: $('.mat-grid-tile')[3].offsetWidth,
      data: {
        chart: {
          caption: 'Total Feedback',
          //subCaption: 'Class Wise Results',
          //numberPrefix: '%',
          //numberSuffix: '%',
          //'theme': 'ocean'
          "theme": "fint",
          usePlotGradientColor: 0,
          yAxisMaxValue: 5
        },
        data: this.processChartData(this.feedbackData, true)
      }
    };
    this.lowerAttandanceDetails = {
      height: height,
      width: $('.mat-grid-tile')[4].offsetWidth,
      showFilter: false,
      showFooter: false,
      fields: [
        { field: 'Department', label: 'Department' },
        { field: 'StudentId', label: 'Student Id' },
        { field: 'percentage', label: 'Percentage' },
      ],
      data:this.marksData
    };
    this.chartConfig.height = height;
    this.chartConfig.width = width;
  }
}
