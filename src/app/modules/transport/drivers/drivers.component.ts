import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
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
      this.years.push({ id: i });
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
    let url = 'bus/getBusFacultyByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'bus/deleteBusFaculty/';
    this.data.editUrl = 'bus/editBusFaculty';
    this.data.deleteMethod = true;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['profilePic', 'bus_no', 'name', 'contactNumber', 'drivinglisence_no', 'address'];
    //this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'profilePic',
        label: 'Picture',
        element: 'image',
        hide: false,
        editable: true,
        update: true
      },
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
        field: 'bus_no',
        label: 'Bus Number',
        element: 'input',
        hide: false,
        update: true,
        editable: true
      },
      {
        field: 'drivinglisence_no',
        label: 'Driving License',
        element: 'input',
        update: true,
        hide: false,
        editable: false
      },
      {
        field: 'name',
        label: 'Driver Name',
        element: 'input',
        update: true,
        hide: false,
        editable: false
      },
      {
        field: 'contactNumber',
        label: 'Contact Number',
        element: 'input',
        update: true,
        hide: false,
        editable: false
      },
      {
        field: 'address',
        label: 'Address',
        update: true,
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

    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data || [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(driver) {
    let temp = {
      "name": driver.name,
      "drivinglisence_no": driver.drivinglisence_no,
      "bus_no": driver.bus_no,
      "address": driver.address,
      "contactNumber": driver.contactNumber,
      "profilePic": driver.profilePic,
      "businessId": this.dataService.user.businessId,
    }
    let url = "bus/addBusFaculty";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus Faculty', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'bus/getBusFacultyByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data || [];
        this.snackBar.open('Bus Faculty Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.newRecord = {};
        this.dataService.getDetails();
      });

    });
  }

  onDelete(flag) {
    this.snackBar.open('Bus Faculty Record ' + flag + ' Succesfully', 'Ok', {
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
