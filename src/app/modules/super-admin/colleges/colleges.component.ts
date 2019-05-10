import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss']
})
export class CollegesComponent implements OnInit {
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
    let url = 'superAdmin/getCollegeByBusinessId';
    this.callGrid = false;
    this.data.url = url;
    this.data.deleteUrl = 'superAdmin/deleteCollege/';
    this.data.editUrl = 'superAdmin/editCollege';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.deleteMethod = true;
    this.data.columns = ['businessId', 'name', 'address', 'branchName', 'contactNumber', 'email'];
    this.fields = [
      {
        field: 'businessId',
        label: 'Business Id',
        element: 'input',
        remove: true,
        hide: false,
        editable: false,
        update: true
      },
      {
        field: 'name',
        label: 'Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'address',
        label: 'Address',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'branchName',
        label: 'branchName',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'contactNumber',
        label: 'Contact Number',
        element: 'number',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'email',
        label: 'Email',
        element: 'email',
        hide: false,
        editable: true,
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
      this.data.data = [];
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "name": student.name,
      "address": student.address,
      "contactNumber": Number(student.contactNumber),
      "email": student.email,
      "branchName": student.branchName,
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "superAdmin/addCollege";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding College', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'superAdmin/getCollegeByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        this.snackBar.open('College Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();

      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('College Record ' + flag + ' Succesfully', 'Ok', {
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

