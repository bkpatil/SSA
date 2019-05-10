import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'add-bus-track',
  templateUrl: './add-bus-track.component.html',
  styleUrls: ['./add-bus-track.component.scss']
})
export class AddBusTrackComponent implements OnInit {
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
    
    //this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'busNo',
        label: 'Bus No',
        element: 'input',
        hide: false,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'boardingTime',
        label: 'Boarding Time',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'studentId',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'latitude',
        label: 'Latitude',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'longitude',
        label: 'Longitude',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      }
    ];
    
  }

  addNewStudent(bus) {
    let temp = { 
      "busNo":bus.busNo,
      "boardingTime":bus.boardingTime,
      "studentId":bus.studentId,
      "latitude":bus.latitude,
      "longitude":bus.longitude,
      }
    let url = "bus/addBusTrack";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus Tracking', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Bus Tracking Added Succesfully', 'Ok', {
        duration: 5000,
      });
      this.newRecord = {};
    });
  }

  onDelete(flag) {
    this.snackBar.open('Bus Record ' + flag + ' Succesfully', 'Ok', {
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

