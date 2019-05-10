import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit {
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
  show: boolean = false;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    //  this.getData();
    this.newRecord.date = new Date().toISOString().slice(0, 10);
    this.dateChange();
    this.user = this.dataService.user;
    this.fields = [
      {
        field: 'orderId',
        label: 'Order Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
    ];
  }
  ngAfterContentChecked() {
    this.getHeightWidth();
  }

  dateChange() {
    let url = 'canteenManager/getActiveOrderIdsByRestaurant',
      date: any = new Date(this.startDate),
      date1: any = new Date(this.endDate),
      longFormat: any = date * 1,  // dont know what it does internally
      longFormat1: any = date1 * 1;
    this.callGrid = false;
    this.data.url = url;
    this.data.objTemp = {
      "date": this.newRecord.date,
      "restaurantId": this.dataService.user.businessId
    };
    // this.fields = [];
    this.data.additionalProperties = { restaurantId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.data.data = [];
      this.data.menuDetails = true;
      this.data.fullDetails = true;
      this.data.columns = ['id', 'restaurantId', 'totalAmount', 'paymentMode', 'isActive'];
      this.data.dynamicColumns = true;
      if (!results || results.code === -1) {

      } else {
        this.data.data = results.data;
      }
      this.show = true;
      this.newRecord = {};
      this.callGrid = true;
    });
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
      this.data.columns = ['id', 'restaurantId', 'totalAmount', 'paymentMode', 'isActive'];
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

      } else {
        this.data.data = this.dataService.getObjectsBy(results.data, { isActive: true });
      }
      this.show = true;
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;
    this.data.showFilter = true;
    this.data.showFooter = false;
  }

  addNewStudent(student) {

    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),
    var temp = {
      restaurantId: this.dataService.user.businessId, orderId: student.orderId
    };
    this.dataService.putData('canteenManager/cancelOrder', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Cancelling Order', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Order Cancelled Succesfully', 'Ok', {
        duration: 5000,
      });
      this.newRecord = {};
    });

    // this.data.data.push(this.newRecord);

  }

  onDelete(flag) {
    this.snackBar.open('Course Record ' + flag + ' Succesfully', 'Ok', {
      duration: 5000,
    });
    this.callGrid = false;
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }
}

