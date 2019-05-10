import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'canteen-orders',
  templateUrl: './canteen-orders.component.html',
  styleUrls: ['./canteen-orders.component.scss']
})
export class CanteenOrdersComponent implements OnInit {
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
  }
  getData() {
    let url = 'canteenManager/getOrdersForCounter',
      date: any = new Date(this.startDate),
      date1: any = new Date(this.endDate),
      longFormat: any = date * 1,  // dont know what it does internally
      longFormat1: any = date1 * 1;
    this.callGrid = false;
    this.data.url = url;
    this.data.objTemp = {
      "fromDate": longFormat,
      "toDate": longFormat1,
      "restaurantId": this.dataService.user.businessId
    };
    // this.fields = [];
    this.data.additionalProperties = { restaurantId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.data.data = [];
      this.data.menuDetails = true;
      this.data.fullDetails = true;
      this.data.columns = ['id','totalAmount','paymentMode','isActive'];
       this.data.dynamicColumns = true;
      if (!results || results.code === -1) {
        this.data.data = [
          {
              "id": "5c32e79a356f04bbb1a52602",
              "restaurantId": "dp1",
              "date": 1546750683592,
              "itemDetailsList": [
                  {
                      "menuName": "panner",
                      "subMenuName": "chicken",
                      "itemName": "pannerChicken",
                      "price": 2000,
                      "quantity": null
                  }
              ],
              "totalAmount": 2000,
              "isCooked": true,
              "userId": "1",
              "paymentMode": "card",
              "isActive": true
          }
      ];

      } else{
        this.data.data = results.data;
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

