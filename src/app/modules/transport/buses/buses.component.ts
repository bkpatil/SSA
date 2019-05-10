import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.scss']
})
export class BusesComponent implements OnInit {
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
    let url = 'bus/getBusByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'bus/deleteBus/';
    this.data.editUrl = 'bus/editBus';
    this.data.deleteMethod = true;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['bus_no', 'capacity'];
    //this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'bus_no',
        label: 'Bus Number',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'capacity',
        label: 'Bus Capacity',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    
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
      "capacity": bus.capacity,
      "businessId": this.dataService.user.businessId,
    }
    let url = "bus/addBus";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'bus/getBusByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data || [];
        this.snackBar.open('Bus Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.newRecord = {};
        this.dataService.getDetails();
      });

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
