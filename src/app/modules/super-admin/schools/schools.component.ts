import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit {
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
    let url = 'superAdmin/getSchoolsByBusinessId';
    this.callGrid = false;
    this.data.url = url;
    this.data.deleteUrl = 'superAdmin/school/';
    this.data.editUrl = 'superAdmin/editSchool';
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.deleteMethod = true;
    this.data.columns = ['businessId', 'name', 'address', 'contactNumber', 'email'];
    this.fields = [
      {
        field: 'id',
        label: 'School Id',
        element: 'input',
        remove: true,
        hide: true,
        editable: false,
        update: true
      },
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
        debugger
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
      "businessId": this.dataService.user.businessId
      // "id": this.dataService.user.Id
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "superAdmin/addSchool";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding School', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'superAdmin/getSchoolsByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        this.snackBar.open('School Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();

      });

    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('School Record ' + flag + ' Succesfully', 'Ok', {
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

