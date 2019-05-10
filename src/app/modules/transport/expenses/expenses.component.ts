import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
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
    let url = 'bus/getBusServiceDetailsByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'bus/deleteBusService/';
    this.data.editUrl = 'bus/editBusService';
    this.data.deleteMethod = true;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['id','busno','serviceDate','nextServiceDate','cost','serviceDetails'];
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        remove: true,
        update:true,
        editable: true
      },
      {
        field: 'busno',
        label: 'Bus Number',
        element: 'input',
        hide: false,
        update:true,
        editable: true
      },
      {
        field: 'serviceDate',
        label: 'Serviced Date',
        element: 'date',
        hide: false,
        update:true,
        editable: false
      },
      {
        field: 'nextServiceDate',
        label: 'Next Serviced Date',
        element: 'date',
        hide: false,
        update:true,
        editable: false
      },
      {
        field: 'cost',
        label: 'Amount',
        element: 'input',
        update:true,
        hide: false,
        editable: false
      },
      {
        field: 'serviceDetails',
        label: 'Service Details',
        element: 'input',
        hide: false,
        update:true,
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
  addNewStudent(details) {
    let temp = {
      "busno": details.busno,
      "serviceDetails": details.serviceDetails,
      "cost": details.cost,
      "serviceDate": this.dataService.convertDate(details.serviceDate, true),
      "nextServiceDate": this.dataService.convertDate(details.nextServiceDate, true),
      "businessId": this.dataService.user.businessId,
    }
    let url = "bus/addBusService";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus Service Details', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'bus/getBusServiceDetailsByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data || [];
        this.snackBar.open('Bus Service Details Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });
  }

  onDelete(flag) {
    this.snackBar.open('Bus Service Details Record ' + flag + ' Succesfully', 'Ok', {
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

