import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'condonation',
  templateUrl: './condonation.component.html',
  styleUrls: ['./condonation.component.scss']
})
export class CondonationComponent implements OnInit {
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
  startDate: any;
  endDate: any;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
    this.data.deleteMethod = true;
    this.data.deleteUrl = 'accounts/deleteCondonation/';
    this.data.editUrl = 'accounts/payCondonationFee';
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.columns = ['id', 'studentId', 'condonation','examFee'];
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
       
        editable: true
      },
      {
        field: 'studentId',
        label: 'student Id',
        element: 'input',
        hide: false,
        remove: true,
        editable: true,
        update: true
      },
      {
        field: 'condonation',
        label: 'condonation',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'examFee',
        label: 'Exam Fee',
        element: 'number',
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
    let url = 'accounts/getCondonationFeeDetails';
    this.data.url = url;
    this.data.objTemp = {
      "startDate": this.dataService.convertDate(this.startDate, true),
      "endDate": this.dataService.convertDate(this.endDate, true)
    };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data;
      this.data.columns = ['id', 'studentId', 'condonation','examFee'];
      this.callGrid = true;
    });
  }

  addNewStudent(student) {
    let temp = {
      "studentId": student.studentId,
      "condonation": student.condonation,
      "examFee": student.examFee,
      "businessId": this.dataService.user.businessId
    }

    let url = "accounts/saveCondonationFee";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Condonation Fee', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.getData();
      this.flip();
      this.dataService.getDetails();
    });
  }

  onDelete(flag) {
    this.snackBar.open('Condonation Fee Details ' + flag + ' Succesfully', 'Ok', {
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


