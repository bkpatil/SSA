import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent implements OnInit {
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
  topData: any = [];
  grid: any = false;
  ngOnInit() {
    let feedbackUrl = 'superAdmin/getCollegeWiseHighestInternalsPercentage',
      businessObj = { businessId: this.dataService.user.businessId };
    this.dataService.getRequest(feedbackUrl).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data['Top Students from All the Colleges '] && results.data['Top Students from All the Colleges '].length) {
        this.topData = results.data['Top Students from All the Colleges '];
      }
      this.grid = false;
      this.lowerAttandanceDetails = {
        height: ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 2,
        width: $('.mat-grid-tile')[1].offsetWidth,
        showFilter: false,
        showFooter: false,
        fields: [
          { field: 'BusinessId', label: 'Business Id' },
          { field: 'StudentId', label: 'StudentId' },
          { field: 'branchName', label: 'Branch' },
          { field: 'percentage', label: 'Percentage' },
        ],
        data: this.topData
      };
      this.grid = true;
    });

    let externalUrl = 'superAdmin/getCollegesExternalsGraphPercentage';
    this.dataService.getRequest(externalUrl).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data && results.data.length) {
        for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: results.data[i].branchName,
            value: results.data[i].percentage
          };
          this.externalData.push(temp);
        }
      }
    });

    let internalUrl = 'superAdmin/getCollegesInternalsGraphPercentage';
    this.dataService.getRequest(internalUrl).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data && results.data.length) {
        for (var i = 0; i < results.data.length; i++) {
          var temp = {
            label: results.data[i].branchName,
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
      height = ($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 2,
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
    this.lowerAttandanceDetails = {
      height: height,
      width: $('.mat-grid-tile')[1].offsetWidth,
      showFilter: false,
      showFooter: false,
      fields: [
        { field: 'BusinessId', label: 'Business Id' },
        { field: 'StudentId', label: 'StudentId' },
        { field: 'branchName', label: 'Branch' },
        { field: 'percentage', label: 'Percentage' },
      ],
      data: this.topData
    };
    this.chartConfig.height = height;
    this.chartConfig.width = width;
  }

}
