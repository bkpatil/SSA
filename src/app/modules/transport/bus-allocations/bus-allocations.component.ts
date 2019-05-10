import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
import { MatSnackBar } from '@angular/material';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'bus-allocations',
  templateUrl: './bus-allocations.component.html',
  styleUrls: ['./bus-allocations.component.scss']
})
export class BusAllocationsComponent implements OnInit {
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
    let url = 'bus/getStudentBusAllocationByBusinessId';
    this.data.url = url;
    this.data.deleteUrl = 'bus/deleteStudentBus/';
    this.data.editUrl = 'bus/editStudentBus';
    this.data.deleteMethod = true;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['id','bus_no','route','student_id','name','fare','parent_number','pass_number'];
    //this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'ID',
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
        field: 'route',
        label: 'Route ',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'student_id',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'name',
        label: 'Student Name',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'fare',
        label: 'Fare',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'parent_number',
        label: 'Parent Number',
        element: 'input',
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'pass_number',
        label: 'Pass Number',
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
        return;
      }
      this.data.data = results.data || [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  addNewStudent(details) {
    let temp = {
      "name": details.name,
      "student_id": details.student_id,
      "bus_no": details.bus_no,
      "fare": details.fare,
      "parent_number": details.parent_number,
      "pass_number": details.pass_number,
      "route": details.route,
      "businessId": this.dataService.user.businessId,
    }
    let url = "bus/addStudentBus";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Bus Allocation', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'bus/getStudentBusAllocationByBusinessId';

      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data || [];
        this.snackBar.open('Bus Allocation Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.newRecord = {};
        this.dataService.getDetails();
      });

    });
  }

  onDelete(flag) {
    this.snackBar.open('Bus Allocation Record ' + flag + ' Succesfully', 'Ok', {
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


