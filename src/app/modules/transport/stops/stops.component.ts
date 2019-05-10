import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss']
})
export class StopsComponent implements OnInit {
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
    this.callGrid = false;
    let url = 'bus/getStopsByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'bus/deleteStops/';
    this.data.editUrl = 'bus/editStops';
    this.data.deleteMethod = true;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['id', 'bus_no', 'start_point', 'end_point', 'fare'];
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        remove: true,
        update: true,
        editable: false
      },
      {
        field: 'bus_no',
        label: 'Bus Number',
        element: 'input',
        hide: false,
        update: true,
        editable: true
      },
      {
        field: 'start_point',
        label: 'Start Point',
        element: 'input',
        hide: false,
        update: true,
        editable: false
      },
      {
        field: 'end_point',
        label: 'End Point',
        element: 'input',
        hide: false,
        update: true,
        editable: false
      },
      {
        field: 'fare',
        label: 'Fare',
        element: 'input',
        hide: false,
        update: true,
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
    //this.data.columns = ['bus_no', 'capacity'];
    //this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data || [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(bus) {
    let temp = {
      "bus_no": bus.bus_no,
      "start_point": bus.start_point,
      "end_point": bus.end_point,
      "fare": bus.fare,
      "businessId": this.dataService.user.businessId,
    }
    let url = "bus/addStops";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus Stop', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'bus/getStopsByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.newRecord = {};
        this.flip();
        this.data.data = results.data || [];
        this.snackBar.open('Bus Stop Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });
  }

  onDelete(flag) {
    this.snackBar.open('Bus Stop Record ' + flag + ' Succesfully', 'Ok', {
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

