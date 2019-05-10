import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'canteen-feedback',
  templateUrl: './canteen-feedback.component.html',
  styleUrls: ['./canteen-feedback.component.scss']
})
export class CanteenFeedbackComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  startDate; any;
  endDate: any;
  expensesType: any;
  feedbackType: any = 'all';
  positive: any = [];
  negative: any = [];
  all: any;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getFeedback();
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
  getFeedback() {
    this.dataService.getRequest('canteenManager/getAllFeedBack/' + this.dataService.user.businessId + '/positive').subscribe(results => {
      if (!results || results.code === -1) {
        this.positive = [];
      } else
        this.positive = results.data;

      if (!this.positive.length) {
        this.positive = [
          {
            "id": "5bff883a356f8aa3ddcbabca",
            "restaurantId": "1",
            "date": 1543473022579,
            "orderId": "5bfe9238356fd5c7331baad7",
            "feedback": "sdssd",
            "scale": 6
          },
          {
            "id": "5bff8873356f8aa3ddcbabcb",
            "restaurantId": "1",
            "date": 1543473022579,
            "orderId": "5bfe9238356fd5c7331baad7",
            "scale": 6
          },
          {
            "id": "5bff8918356fa20c6710521c",
            "restaurantId": "1",
            "date": 1543473381803,
            "orderId": "5bfe9238356fd5c7331baad7",
            "feedback": "sdssd",
            "scale": 6
          }
        ]
      }
      this.newRecord = {};
    });
    this.dataService.getRequest('canteenManager/getAllFeedBack/' + this.dataService.user.businessId + '/negative').subscribe(results => {
      if (!results || results.code === -1) {
        this.negative = [];
      } else
        this.negative = results.data;
      if (!this.negative.length) {
        this.negative = [{
          "id": "5bff883a356f8aa3ddcbabca",
          "restaurantId": "1",
          "date": 1543473022579,
          "orderId": "5bfe9238356fd5c7331baad7",
          "feedback": "sdssd",
          "scale": 1
        },
        {
          "id": "5bff8873356f8aa3ddcbabcb",
          "restaurantId": "1",
          "date": 1543473022579,
          "orderId": "5bfe9238356fd5c7331baad7",
          "scale": 3
        },
        {
          "id": "5bff8918356fa20c6710521c",
          "restaurantId": "1",
          "date": 1543473381803,
          "orderId": "5bfe9238356fd5c7331baad7",
          "feedback": "sdssd",
          "scale": 2
        }
        ]
      }
      this.all = this.positive.concat(this.negative);
      this.data.data = this.all;
      this.newRecord = {};
      this.viewFeedback();
    });
  }
  viewFeedback() {
    this.callGrid = false;
    this.fields = [
      {
        field: 'id',
        label: 'Id',
        element: 'input',
        hide: true,
        editable: true,
        update: true
      },
      {
        field: 'restaurantId',
        label: 'Restaurant Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
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
        field: 'orderId',
        label: 'Order Id',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'feedback',
        label: 'Feedback',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'scale',
        label: 'Scale',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
    ];
    if (this.feedbackType === 'negative') {
      this.data.data = this.negative;
    } else if (this.feedbackType === 'positive') {
      this.data.data = this.positive;
    } else {
      this.all = this.positive.concat(this.negative);
      this.data.data = this.all;
    }
    this.callGrid = true;
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
      "expensesType": this.expensesType,
      "fromDate": longFormat,
      "toDate": longFormat1,
      "userName": this.dataService.user.userName,
      "restaurantId": this.dataService.user.businessId
    };
    this.fields = [];
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
    let temp = {
      "orderId": student.orderId,
      "feedback": student.feedback,
      "scale": student.scale,
      "restaurantId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "canteenManager/saveCanteenFeedBack";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Feedback', 'Ok', {
          duration: 5000,
        });
        return;
      }
      else {
        this.snackBar.open('Feedback Added Succesfully', 'Ok', {
          duration: 5000,
        });
      }
      this.getFeedback();
      this.flip();
    });
  }

  // this.data.data.push(this.newRecord);
  onDelete(flag) {
    this.snackBar.open('Course Record ' + flag + ' Succesfully', 'Ok', {
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

