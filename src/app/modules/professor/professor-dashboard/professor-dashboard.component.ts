import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';

@Component({
  selector: 'professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss']
})
export class ProfessorDashboardComponent implements OnInit {
  tile: any = {};
  constructor(private dataService: DataService) { }
  chartConfig: any = {};
  externalConfig: any = {};
  attandanceConfig: any = {};
  internalConfig: any = {};
  feedbackConfig: any = {};
  lowerMarksDetails: any = {};
  externalData: any = [];
  internalData: any = [];
  feedbackData: any = [];
  marksData: any = [];
  showGrid: boolean = false;
  ngOnInit() {
    let externalUrl = this.dataService.user.selectedRole === 'HOD' ? 'external/getStudentGraphForHod' : 'external/viewExternalsPercentageForProfessor',
      businessObj = {
        userName: this.dataService.user.userName,
        businessId: this.dataService.user.businessId
      };
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

    let internalUrl = this.dataService.user.selectedRole === 'HOD' ? 'internals/getStudentGraphForHod' : 'internals/viewInternalsPercentageForProfessor';
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

    let marksUrl = 'external/viewExternalsBranchTopperForProfessor';
    this.dataService.getData(marksUrl, { userName: this.dataService.user.userName }).subscribe(results => {
      this.showGrid = false;
      if (!results || results.code === -1) {
        return;
      }
      if (results.data) {
        this.marksData = results.data['Top Students from All the Branches '];
        this.showGrid = true;
      }
    });

    let feedbackUrl = 'professor/getFeedBackForProfessor';
    this.dataService.getData(feedbackUrl, businessObj).subscribe(results => {
      if (!results || results.code === -1) {
        return;
      }
      if (results.data) {
        var temp = {
          label: 'Behaviour',
          value: results.data.behaviourPercentage || '1',
        };
        this.feedbackData.push(temp);
        var temp = {
          label: 'Live Examples',
          value: results.data.liveExamplesPercentage || '1',
        };
        this.feedbackData.push(temp);
        var temp = {
          label: 'Teaching',
          value: results.data.teachingPercentage || '1',
        };
        this.feedbackData.push(temp);
      }
    });

    this.tile.color = 'white';
    //this.tile.rowHeight = ($('.sidenav-body')[0].height() / 3 );
  }
  processChartData(data, max?) {
    for (var i = 0; i < data.length; i++) {
      let record = data[i];
      if (record.value < 40) {
        record.color = '#ff0000';
        // record.isSliced = "1";
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
        //     label: 'Class 1',
        //     value: '65',
        //     color: '#f00'
        //   },
        //   {
        //     label: 'Class 2',
        //     value: '81'
        //   },
        //   {
        //     label: 'Class 3',
        //     value: '70'
        //   },
        //   {
        //     label: 'Class 4',
        //     value: '59'
        //   },
        //   {
        //     label: 'Class 5',
        //     value: '83'
        //   },
        //   {
        //     label: 'Class 6',
        //     value: '82'
        //   },
        //   {
        //     label: 'Class 7',
        //     value: '42'
        //   },
        //   {
        //     label: 'Class 8',
        //     value: '39'
        //   },
        //   {
        //     label: 'Class 9',
        //     value: '72'
        //   },
        //   {
        //     label: 'Class 10',
        //     value: '92'
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
        //     label: 'Class 1',
        //     value: '39'
        //   },
        //   {
        //     label: 'Class 2',
        //     value: '81'
        //   },
        //   {
        //     label: 'Class 3',
        //     value: '49'
        //   },
        //   {
        //     label: 'Class 4',
        //     value: '79'
        //   },
        //   {
        //     label: 'Class 5',
        //     value: '83'
        //   },
        //   {
        //     label: 'Class 6',
        //     value: '52'
        //   },
        //   {
        //     label: 'Class 7',
        //     value: '72'
        //   },
        //   {
        //     label: 'Class 8',
        //     value: '42'
        //   },
        //   {
        //     label: 'Class 9',
        //     value: '79'
        //   },
        //   {
        //     label: 'Class 10',
        //     value: '49'
        //   },
        // ])

      }
    };
    this.feedbackConfig = {
      type: 'pie2d',
      height: height,
      width: $('.mat-grid-tile')[1].offsetWidth,
      data: {
        chart: {
          caption: 'Feedback',
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
        data: this.processChartData(this.feedbackData, true)
        // data: this.processChartData([
        //   {
        //     label: 'Behaviour',
        //     value: '80'
        //   },
        //   {
        //     label: 'Teaching',
        //     value: '81'
        //   },
        //   {
        //     label: 'Live Examples',
        //     value: '70'
        //   }
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
    //       usePlotGradientColor :0
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
    this.lowerMarksDetails = {
      height: height,
      width: $('.mat-grid-tile')[3].offsetWidth,
      showFilter: false,
      showFooter: false,
      fields: [
        { field: 'StudentId', label: 'Student Id' },
        { field: 'Department', label: 'Department' },
        { field: 'percentage', label: 'Percentage' },
        { field: 'subject', label: 'subject' },
      ],
      data: this.marksData
    };
    this.chartConfig.height = height;
    this.chartConfig.width = width;
  }
}

