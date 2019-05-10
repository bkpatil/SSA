import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'school-expenses',
  templateUrl: './school-expenses.component.html',
  styleUrls: ['./school-expenses.component.scss']
})
export class SchoolExpensesComponent implements OnInit {
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
  showData: boolean = false;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
    this.data.deleteMethod = true;
    this.data.deleteUrl = 'accounts/deleteSchoolExpensesDetails/';
    this.data.editUrl = 'accounts/updateSchoolExpensesDetails';
    this.data.additionalProperties = { businessId: this.dataService.user.businessId };
    this.data.columns = ['invoiceNumber', 'merchantName', 'typeOfService', 'chequeNumber', 'bill', 'uploadBill', 'checkStatus'];
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true
      },
      {
        field: 'uploadBill',
        label: 'Upload Bill',
        element: 'fileUpload',
        url: 'library/uploadfile',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'invoiceNumber',
        label: 'Invoice Number',
        element: 'input',
        hide: false,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'merchantName',
        label: 'Merchant Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'typeOfService',
        label: 'Type Of Service',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'chequeNumber',
        label: 'Cheque Number',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'bill',
        label: 'Bill',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'checkStatus',
        label: 'Check Status',
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
    this.showData = false;
    let url = 'accounts/getSchoolExpensesByDate';
    this.data.url = url;
    this.data.objTemp = {
      "startDate": this.dataService.convertDate(this.startDate, true),
      "endDate": this.dataService.convertDate(this.endDate, true)
    };
    if (this.startDate && this.endDate) {
      this.dataService.getData('accounts/getTotalSchoolExpensesByDate', this.data.objTemp).subscribe(results => {
        if (results.code === -1) {
          this.data.data = [];
        } else {
          this.data.totalDays = results.data.totalDays;
          this.data.totalExpenses = results.data.totalExpenses;
        }
        this.showData = true;
      });
      this.dataService.getData(url, this.data.objTemp).subscribe(results => {
        if (results.code === -1) {
          this.data.data = [];
        } else
          this.data.data = results.data;
        this.data.columns = ['invoiceNumber', 'merchantName', 'typeOfService', 'chequeNumber', 'bill', 'uploadBill', 'checkStatus'];
        this.callGrid = true;
      });
    }
  }

  addNewStudent(student) {
    let temp = {
      "merchantName": student.merchantName,
      "typeOfService": student.typeOfService,
      "invoiceNumber": student.invoiceNumber,
      "chequeNumber": student.chequeNumber,
      "bill": student.bill,
      "documents": student.documents,
      "uploadBill": student.uploadBill,
      "checkStatus": student.checkStatus,
      "businessId": this.dataService.user.businessId
    }

    let url = "accounts/saveSchoolExpenses";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding School Expenses', 'Ok', {
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
    this.snackBar.open('School Expenses ' + flag + ' Succesfully', 'Ok', {
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
