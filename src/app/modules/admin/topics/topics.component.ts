import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  searchFields: any;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  tempValue: any;
  showSearch: boolean = true;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
    this.data.deleteMethod = true;
    this.data.deleteUrl = 'admin/deleteHolidays/';
    this.data.editUrl = 'admin/editHolidays';
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        remove: true,
      },
      {
        field: 'date',
        label: 'Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'numberOfDays',
        label: 'Number Of Days',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'reason',
        label: 'Reason',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true,
        update: false
      }
    ]
    this.newRecord = {};
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
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
    let url = 'admin/viewHolidays';
    this.data.url = url;
    this.data.objTemp = { businessId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
        this.data.columns = ['id','date','numberOfDays','reason'];
      this.callGrid = true;
    });
  }

  addNewStudent(student) {
    let temp =  {
      "date":this.dataService.convertDate(student.date,true),
      "reason":student.reason,
      "numberOfDays":student.numberOfDays,
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addHolidays";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Holidays', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.getData();
      this.flip();
      this.newRecord = {};
      this.dataService.getDetails();
    });
  }

  onDelete(flag) {
    this.snackBar.open('Holidays ' + flag + ' Succesfully', 'Ok', {
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
