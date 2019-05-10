import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  startDate; any;
  endDate: any;
  tile: any = {};
  starters: any;
  mainCourse: any;
  desserts: any;
  beverages: any;
  paymentMode:any = 'select';
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
    if (!this.frontVisible) {
      let padding = 60,
        height = (($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 2) - 20,
        width = $('.mat-grid-tile')[0] ? $('.mat-grid-tile')[0].offsetWidth : 100;
      this.tile.rowHeight = height + 'px';
    }
  }
  getData() {
    let url = this.frontVisible ? 'canteenManager/getSalesReport' : 'canteenManager/getItemWiseSalesReport',
      date: any = new Date(this.startDate),
      date1: any = new Date(this.endDate),
      longFormat: any = date * 1,  // dont know what it does internally
      longFormat1: any = date1 * 1;
    this.callGrid = false;
    this.data.url = url;
    this.data.objTemp = {
      "fromDate": longFormat,
      "toDate": longFormat1,
      "userName": this.dataService.user.userName,
      "restaurantId": this.dataService.user.businessId
    };
    if(this.frontVisible){
      this.data.objTemp.paymentType = this.paymentMode;
    }
    this.fields = [];
    this.data.additionalProperties = { restaurantId: this.dataService.user.businessId };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      this.data.data = [];
      if (!results || results.code === -1) {
        this.data.data = [];
        // if (!this.frontVisible) {
        //   this.data.dynamicColumns = true;

        //   let height = (($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 2) - 20;
        //   this.starters = {
        //     height: height,
        //     width: $('.mat-grid-tile')[0] ? $('.mat-grid-tile')[0].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
        //     showFilter: false,
        //     showFooter: false,
        //     fields: [
        //       { field: 'itemName', label: 'Item Name' },
        //       { field: 'price', label: 'Price' },
        //       { field: 'avgSales', label: 'Average Sales' },
        //       { field: 'totalSales', label: 'Total Sales' },
        //     ],
        //     data: [
        //       { "itemName": "chilli Paneer", "price": '150', 'avgSales': '55', 'totalSales': '55' },
        //       { "itemName": "Paneer Tikka", "price": '170', 'avgSales': '10', 'totalSales': '15' },
        //       { "itemName": "Manchuria", "price": '120', 'avgSales': '25', 'totalSales': '50' },
        //       { "itemName": "chilli Chicken", "price": '190', 'avgSales': '24', 'totalSales': '45' },
        //       { "itemName": "Chicken 65", "price": '180', 'avgSales': '76', 'totalSales': '115' },
        //       { "itemName": "Crispy Corn", "price": '100', 'avgSales': '11', 'totalSales': '13' },
        //       { "itemName": "Fish Fry", "price": '200', 'avgSales': '15', 'totalSales': '42' },
        //     ]
        //   };
        //   this.mainCourse = {
        //     height: height,
        //     width: $('.mat-grid-tile')[1] ? $('.mat-grid-tile')[1].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
        //     showFilter: false,
        //     showFooter: false,
        //     fields: [
        //       { field: 'itemName', label: 'Item Name' },
        //       { field: 'price', label: 'Price' },
        //       { field: 'avgSales', label: 'Average Sales' },
        //       { field: 'totalSales', label: 'Total Sales' },
        //     ],
        //     data: [
        //       { "itemName": "Veg Biryani", "price": '150', 'avgSales': '55', 'totalSales': '55' },
        //       { "itemName": "Paneer Biryani", "price": '170', 'avgSales': '10', 'totalSales': '15' },
        //       { "itemName": "Chicken Biryani", "price": '120', 'avgSales': '25', 'totalSales': '50' },
        //       { "itemName": "Mutton Biryani", "price": '190', 'avgSales': '24', 'totalSales': '45' },
        //       { "itemName": "Prawns Biryani", "price": '180', 'avgSales': '76', 'totalSales': '115' },
        //       { "itemName": "Avakai Biryani", "price": '100', 'avgSales': '11', 'totalSales': '13' },
        //       { "itemName": "Fish Biryani", "price": '200', 'avgSales': '15', 'totalSales': '42' },
        //     ]
        //   };
        //   this.desserts = {
        //     height: height,
        //     width: $('.mat-grid-tile')[2] ? $('.mat-grid-tile')[2].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
        //     showFilter: false,
        //     showFooter: false,
        //     fields: [
        //       { field: 'itemName', label: 'Item Name' },
        //       { field: 'price', label: 'Price' },
        //       { field: 'avgSales', label: 'Average Sales' },
        //       { field: 'totalSales', label: 'Total Sales' },
        //     ],
        //     data: [
        //       { "itemName": "Carrot Halwa", "price": '50', 'avgSales': '55', 'totalSales': '55' },
        //       { "itemName": "Gulab Jamun", "price": '30', 'avgSales': '10', 'totalSales': '15' },
        //       { "itemName": "Ice Cream", "price": '50', 'avgSales': '25', 'totalSales': '50' },
        //       { "itemName": "Doubleka meeta", "price": '40', 'avgSales': '24', 'totalSales': '45' },
        //       { "itemName": "Chocolate Brownie", "price": '25', 'avgSales': '76', 'totalSales': '115' },
        //       { "itemName": "Fruit Salad", "price": '30', 'avgSales': '11', 'totalSales': '13' },
        //       { "itemName": "Pastry", "price": '30', 'avgSales': '15', 'totalSales': '42' },
        //     ]
        //   };
        //   this.beverages = {
        //     height: height,
        //     width: $('.mat-grid-tile')[3] ? $('.mat-grid-tile')[3].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
        //     showFilter: false,
        //     showFooter: false,
        //     fields: [
        //       { field: 'itemName', label: 'Item Name' },
        //       { field: 'price', label: 'Price' },
        //       { field: 'avgSales', label: 'Average Sales' },
        //       { field: 'totalSales', label: 'Total Sales' },
        //     ],
        //     data: [
        //       { "itemName": "Lassi", "price": '35', 'avgSales': '55', 'totalSales': '55' },
        //       { "itemName": "Buttermilk", "price": '20', 'avgSales': '10', 'totalSales': '15' },
        //       { "itemName": "milkshake", "price": '40', 'avgSales': '25', 'totalSales': '50' },
        //       { "itemName": "Thumbs up", "price": '25', 'avgSales': '24', 'totalSales': '45' },
        //       { "itemName": "Pepsi", "price": '25', 'avgSales': '76', 'totalSales': '115' },
        //       { "itemName": "Maaza", "price": '25', 'avgSales': '11', 'totalSales': '13' },
        //       { "itemName": "Limca", "price": '25', 'avgSales': '15', 'totalSales': '42' },
        //       { "itemName": "Sprite", "price": '25', 'avgSales': '15', 'totalSales': '42' },
        //     ]
        //   };


        // } else {
        //   this.data.dynamicColumns = false;

        //   this.fields = [
        //     {
        //       field: 'date',
        //       label: 'Date',
        //       element: 'date',
        //       hide: false,
        //       editable: true,
        //       update: true
        //     },
        //     {
        //       field: 'totalPrice',
        //       label: 'Total Price',
        //       element: 'input',
        //       hide: false,
        //       editable: true,
        //       update: true
        //     },
        //     {
        //       field: 'totalSales',
        //       label: 'Total Sales',
        //       element: 'input',
        //       hide: false,
        //       editable: true,
        //       update: true
        //     },
        //   ]
        //   this.data.data = [
        //     {
        //       "date": 1543403701136,
        //       "totalPrice": 100,
        //       "totalSales": 11
        //     },
        //     {
        //       "date": 1543405879118,
        //       "totalPrice": 120,
        //       "totalSales": 144
        //     },
        //     {
        //       "date": 1543405729908,
        //       "totalPrice": 30,
        //       "totalSales": 115
        //     },
        //     {
        //       "date": 1543405573320,
        //       "totalPrice": 70,
        //       "totalSales": 10
        //     },
        //     {
        //       "date": 1543410118977,
        //       "totalPrice": 230,
        //       "totalSales": 15
        //     }
        //   ]
        // }
      } else {
        this.data.dynamicColumns = true;
        if (!this.frontVisible) {
          let height = (($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 2) - 20;
          this.starters = {
            height: height,
            width: $('.mat-grid-tile')[0] ? $('.mat-grid-tile')[0].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
            showFilter: false,
            showFooter: false,
            fields: [
              { field: 'item name', label: 'Item Name' },
              { field: 'price ', label: 'Price' },
              { field: 'avg sales', label: 'Average Sales' },
              { field: 'total sales', label: 'Total Sales' },
            ],
            data: results.data[0]['STARTERS']
          };
          this.mainCourse = {
            height: height,
            width: $('.mat-grid-tile')[1] ? $('.mat-grid-tile')[1].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
            showFilter: false,
            showFooter: false,
            fields: [
              { field: 'item name', label: 'Item Name' },
              { field: 'price ', label: 'Price' },
              { field: 'avg sales', label: 'Average Sales' },
              { field: 'total sales', label: 'Total Sales' },
            ],
            data: results.data[0]['MAIN COURSE']
          };
          this.desserts = {
            height: height,
            width: $('.mat-grid-tile')[2] ? $('.mat-grid-tile')[2].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
            showFilter: false,
            showFooter: false,
            fields: [
              { field: 'item name', label: 'Item Name' },
              { field: 'price ', label: 'Price' },
              { field: 'avg sales', label: 'Average Sales' },
              { field: 'total sales', label: 'Total Sales' },
            ],
            data: results.data[0]['DESSERTS']
          };
          this.beverages = {
            height: height,
            width: $('.mat-grid-tile')[3] ? $('.mat-grid-tile')[3].offsetWidth : $('.sidenav-body')[0].offsetWidth / 2 - 20,
            showFilter: false,
            showFooter: false,
            fields: [
              { field: 'item name', label: 'Item Name' },
              { field: 'price ', label: 'Price' },
              { field: 'avg sales', label: 'Average Sales' },
              { field: 'total sales', label: 'Total Sales' },
            ],
            data: results.data[0]['DRINKS']
          };
        }
      }
      this.data.data = results.data;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "course": student.course,
      "department": student.department,
      "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "admin/addCourse";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Course', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'admin/getCoursesByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        this.snackBar.open('Course Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();

      });

    });

    // this.data.data.push(this.newRecord);

  }

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
    this.getData();
  }
}

