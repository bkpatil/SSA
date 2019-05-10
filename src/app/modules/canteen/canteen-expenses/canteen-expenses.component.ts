import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'canteen-expenses',
  templateUrl: './canteen-expenses.component.html',
  styleUrls: ['./canteen-expenses.component.scss']
})
export class CanteenExpensesComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  startDate; any;
  endDate: any;
  expensesType: any = 'select';
  stockFields: any = [];
  assetFields: any = [];
  wagesFields: any = [];
  otherFields: any = [];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.stockFields = [
      {
        field: 'restaurantId',
        label: 'Restaurant Id',
        element: 'input',
        hide: true,
        editable: true,
        update: true
      },
      {
        field: 'invoiceDate',
        label: 'Invoice Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'invoiceNumber',
        label: 'invoice Number',
        element: 'input',
        hide: false,
        remove: true,
        editable: true,
        update: true
      },
      {
        field: 'merchantName',
        label: 'merchant Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'noOfItems',
        label: 'no Of Items',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'totalBill',
        label: 'total Bill',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'typeOfStock',
        label: 'type Of Stock',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
    ];
    this.assetFields = [
      {
        field: 'invoiceNumber',
        label: 'invoice Number',
        element: 'input',
        hide: false,
        editable: true,
        remove: true,
        update: true
      },
      {
        field: 'itemName',
        label: 'item Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'merchantName',
        label: 'merchant Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'quantity',
        label: 'quantity',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'totalBill',
        label: 'total Bill',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'typeOfAsset',
        label: 'type Of Asset',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'invoiceDate',
        label: 'Invoice Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
    ];
    this.wagesFields = [

      {
        field: 'designation',
        label: 'designation',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'employeeId',
        label: 'employee Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'employeeName',
        label: 'employee Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'jobType',
        label: 'job Type',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      }, {
        field: 'invoiceNumber',
        label: 'invoice Number',
        element: 'input',
        hide: false,
        remove: true,
        editable: true,
        update: true
      },
      {
        field: 'paymentDate',
        label: 'payment Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'salary',
        label: 'salary',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
    ];
    this.otherFields = [

      {
        field: 'invoiceDate',
        label: 'invoice Date',
        element: 'date',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'invoiceNumber',
        label: 'invoice Number',
        element: 'input',
        hide: false,
        remove: true,
        editable: true,
        update: true
      },
      {
        field: 'merchantName',
        label: 'merchant Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'numberOfItems',
        label: 'number Of Items',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'reason',
        label: 'reason',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'totalBill',
        label: 'total Bill',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
    ];
    if (this.expensesType === 'stock') {
      this.fields = this.stockFields;
      this.data.deleteUrl = 'canteenExpenses/deleteStockExpensesDetails/';
      this.data.editUrl = 'canteenExpenses/updateStockExpensesDetails';
    }
    else if (this.expensesType === 'asset') {
      this.fields = this.assetFields;
      this.data.deleteUrl = 'canteenExpenses/deleteStockExpensesDetails/';
      this.data.editUrl = 'canteenExpenses/updateStockExpensesDetails';
    }
    else if (this.expensesType === 'wages') {
      this.data.deleteUrl = 'canteenExpenses/deleteWages/';
      this.data.editUrl = 'canteenExpenses/updateWages';
      this.fields = this.wagesFields;
    }
    else if (this.expensesType === 'other') {
      this.data.deleteUrl = 'canteenExpenses/deleteOtherExpenses/';
      this.data.editUrl = 'canteenExpenses/updateOtherExpenses';
      this.fields = this.otherFields;
    }
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
    this.data.updatable = false;
    this.data.deletable = false;
  }
  getData() {
    let url = 'canteenManager/getExpensesByDate',
      date: any = new Date(this.startDate),
      date1: any = new Date(this.endDate),
      longFormat: any = date * 1,  // dont know what it does internally
      longFormat1: any = date1 * 1;
    this.callGrid = false;
    this.data.url = url;
    this.data.objTemp = {
      
      "fromDate": this.startDate,
      "toDate": this.endDate,
      // "userName": this.dataService.user.userName,
      "restaurantId": this.dataService.user.businessId
    };
    // this.fields = [];
    if (this.expensesType === 'stock') {
      this.data.objTemp.expensesType = this.expensesType;
      url = "canteenExpenses/getStockExpensesInvoiceDetails";
    }
    else if (this.expensesType === 'asset') {
    
      url = "canteenExpenses/getAssetExpenses";
      
    }
    else if (this.expensesType === 'wages') {
      url = "canteenExpenses/getCanteenEmployeeWages";
      
    }
    else if (this.expensesType === 'other') {
      url = "canteenExpenses/getOtherExpenses";
      
    }
    this.data.additionalProperties = { restaurantId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.data.data = [];
      this.data.dynamicColumns = true;
      if (!results || results.code === -1) {
        this.data.data = [];

      } else
        this.data.data = results.data;

      if (!this.data.data.length) {
        this.data.data = [
          {
            "restaurantId": "1",
            "merchantName": "hari",
            "typeOfStock": "ice",
            "noOfItems": 5,
            "invoiceDate": "2018-11-14T10:17:54.634Z",
            "invoiceNumber": "in1",
            "totalBill": 67
          }
        ];
      }
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp: any = {}, url = '';
    this.data.deleteMethod = true;
    if (this.expensesType === 'stock') {
      this.fields = this.stockFields;
      temp = {
        "invoiceDate": this.dataService.convertDate(student.invoiceDate, true),
        "invoiceNumber": student.invoiceNumber,
        "merchantName": student.merchantName,
        "noOfItems": student.noOfItems,
        "restaurantId": this.dataService.user.businessId,
        "totalBill": student.totalBill,
        "typeOfStock": student.typeOfStock,
      }
      url = "canteenExpenses/saveStockExpenses";
      this.data.deleteUrl = 'canteenExpenses/deleteStockExpensesDetails/';
      this.data.editUrl = 'canteenExpenses/updateStockExpensesDetails';
    }
    else if (this.expensesType === 'asset') {
      this.fields = this.assetFields;
      temp = {
        "invoiceNumber": student.invoiceNumber,
        "itemName": student.itemName,
        "merchantName": student.merchantName,
        "quantity": student.quantity,
        "totalBill": student.totalBill,
        "invoiceDate":student.invoiceDate,
        "typeOfAsset": student.typeOfAsset,
      }
      url = "canteenExpenses/saveAssetExpenses";
      this.data.deleteUrl = 'canteenExpenses/deleteStockExpensesDetails/';
      this.data.editUrl = 'canteenExpenses/updateStockExpensesDetails';
    }
    else if (this.expensesType === 'wages') {
      url = "canteenExpenses/saveWages";
      this.data.deleteUrl = 'canteenExpenses/deleteWages/';
      this.data.editUrl = 'canteenExpenses/updateWages';
      this.fields = this.wagesFields;
      temp = {
        "designation": student.designation,
        "employeeId": student.employeeId,
        "employeeName": student.employeeName,
        "jobType": student.jobType,
        "invoiceNumber": student.invoiceNumber,
        "paymentDate": this.dataService.convertDate(student.paymentDate, true),
        "salary": student.salary,
      }
    }
    else if (this.expensesType === 'other') {
      url = "canteenExpenses/saveOtherExpenses";
      this.data.deleteUrl = 'canteenExpenses/deleteOtherExpenses/';
      this.data.editUrl = 'canteenExpenses/updateOtherExpenses';
      this.fields = this.otherFields;
      temp = {
        "invoiceDate": this.dataService.convertDate(student.invoiceDate, true),
        "invoiceNumber": student.invoiceNumber,
        "merchantName": student.merchantName,
        "numberOfItems": student.numberOfItems,
        "reason": student.reason,
        "totalBill": student.totalBill,
        "restaurantId": this.dataService.user.businessId,

      }
    }


    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Expense', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.getData();
      this.flip();
      this.snackBar.open('Expense Added Succesfully', 'Ok', {
        duration: 5000,
      });
      this.newRecord = {};
    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Expense Record ' + flag + ' Succesfully', 'Ok', {
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

