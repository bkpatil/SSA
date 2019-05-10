import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.scss']
})
export class BusDetailsComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord:any = {};
  years:any =[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({value:i});
    };
  }
  ngAfterContentChecked(){
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width-45;
    this.data.height = height - 82;;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    this.callGrid = false;
   // let url = 'https://api.myjson.com/bins/128rnq';
    let url = 'https://api.myjson.com/bins/13au9e';
    this.fields = [
      {
        field: 'BusNumber',
        label: 'Bus Number',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'DriverName',
        label: 'Driver Name',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'DriverNumber',
        label: 'Driver Number',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'Contact',
        label: 'Contact Number',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'Address',
        label: 'Address',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    
    this.dataService.getData(url,{}).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent (student){
    this.data.data.push(this.newRecord);
    this.flip();
    this.dataService.getDetails();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

}
