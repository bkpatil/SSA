import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
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
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ value: i });
    };
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
    let url = 'bus/getBusOwnerByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'bus/deleteBusOwner/';
    this.data.editUrl = 'bus/editBusOwner';
    this.data.deleteMethod = true;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['id','name','address','contract_period','contract_amount','contactNumber'];
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        remove: true,
        update: true,
        editable: true
      },
      {
        field: 'name',
        label: 'Owner Name',
        element: 'input',
        hide: false,
        update: true,
        editable: true
      },
      {
        field: 'address',
        label: 'Address',
        element: 'input',
        hide: false,
        update: true,
        editable: false
      },
      {
        field: 'contract_period',
        label: 'Contract Period',
        element: 'input',
        hide: false,
        update: true,
        editable: false
      },
      {
        field: 'contract_amount',
        label: 'Amount',
        element: 'input',
        hide: false,
        update: true,
        editable: false
      },
      {
        field: 'contactNumber',
        label: 'Contact Number',
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


  addNewStudent(details) {
    let temp = {
      "name": details.name,
      "contract_period": details.contract_period,
      "contract_amount": details.contract_amount,
      "address": details.address,
      "contactNumber": details.contactNumber,
      "businessId": this.dataService.user.businessId,
    }
    let url = "bus/addBusOwner";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus Owner', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'bus/getBusOwnerByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.newRecord = {};
        this.data.data = results.data || [];
        this.snackBar.open('Bus Owner Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();
      });

    });
  }

  onDelete(flag) {
    this.snackBar.open('Bus Owner Record ' + flag + ' Succesfully', 'Ok', {
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


