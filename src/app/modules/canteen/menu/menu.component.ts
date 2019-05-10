import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
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
  tile: any = {};
  starters: any = {};
  mainCourse: any = {};
  desserts: any = [];
  beverages: any = [];
  showStartersMenu: any = 0;
  showBeveragesMenu: any = 0;
  showDessertsMenu: any = 0;
  showMainCourseMenu: any = 0;
  reload: boolean = true;
  showCart: boolean = false;
  cartItems: any = [];
  price: any = 0;
  quantity: any = 0;
  customerName: any = '';
  customerPhone: any = '';
  paymentMode: any = '';
  subMenu: any = [];
  showSubMenu: any = false;
  beveragesTemp: any = [];
  mainCourseTemp: any = [];
  startersTemp: any = [];
  dessertsTemp: any = [];
  temp: any = {};
  // cart: any = {
  //   starters: {
  //     veg: [],
  //     paneer: [],
  //     chicken: [],
  //     seaFood: []
  //   },
  //   mainCourse: {
  //     veg: [],
  //     nonVeg: []
  //   },
  //   desserts: [],
  //   beverages: []
  // };
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }
  valueChange(field) {
    this.showSubMenu = false;
    if (field.field === 'mainMenu') {
      if (this.newRecord.mainMenu === 'STARTERS') {
        this.subMenu = ['veg', 'paneer', 'chicken', 'seaFood'];
      }
      else if (this.newRecord.mainMenu === 'MAIN COURSE') {
        this.subMenu = ['veg', 'nonVeg'];
      }
      else if (this.newRecord.mainMenu === 'DESSERTS') {
        this.subMenu = ['DESSERTS'];
      }
      else if (this.newRecord.mainMenu === 'DRINKS') {
        this.subMenu = ['DRINKS'];
      }
      this.showSubMenu = true;
    }
  }
  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    this.fields = [
      {
        field: 'mainMenu',
        label: 'Main Menu Name',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: [
          { id: 'STARTERS', value: 'Starters' },
          { id: 'MAIN COURSE', value: 'Main Course' },
          { id: 'DESSERTS', value: 'Desserts' },
          { id: 'DRINKS', value: 'Beverages' },
        ]
      },
      {
        field: 'subMenu',
        label: 'Sub Menu Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true,
      },
      {
        field: 'itemName',
        label: 'Item Name',
        element: 'input',
        hide: false,
        editable: true,
        update: true
      },
      {
        field: 'orderFor',
        label: 'Order For',
        element: 'dropdown',
        hide: false,
        editable: true,
        update: true,
        values: [
          { id: 'DINEIN', value: 'DINE IN' },
          { id: 'Delivery', value: 'Delivery' },
        ]
      },
      {
        field: 'price',
        label: 'Price',
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

  getHeightWidth() {
    // let padding = 60,
    //   height = (($('.nav-list')[0].offsetTop - $('.sidenav-body')[0].offsetTop - 50) / 2) - 20,
    //   width = $('.mat-grid-tile')[0] ? $('.mat-grid-tile')[0].offsetWidth : 100;
    // this.tile.rowHeight = height + 'px';
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;
    this.data.showFilter = true;
    this.data.showFooter = false;
  }

  getData() {
    this.callGrid = false;
    this.dataService.getRequest('canteenManager/getMenu/' + this.dataService.user.businessId).subscribe(results => {
      this.data.data = [];
      this.data.dynamicColumns = true;
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data[0]['DINE IN List '];
      let startersTemp = this.dataService.getObjectBy(this.data.data, { name: 'STARTERS' });
      if (!startersTemp)
        startersTemp = this.dataService.getObjectBy(this.data.data, { name: 'starters' });

      let mainCourseTemp = this.dataService.getObjectBy(this.data.data, { name: 'MAIN COURSE' });
      if (!mainCourseTemp)
        mainCourseTemp = this.dataService.getObjectBy(this.data.data, { name: 'mainCourse' });
      let dessertsTemp = this.dataService.getObjectBy(this.data.data, { name: 'DESSERTS' });
      if (!dessertsTemp)
        dessertsTemp = this.dataService.getObjectBy(this.data.data, { name: 'desserts' });
      let beveragesTemp = this.dataService.getObjectBy(this.data.data, { name: 'DRINKS' });
      if (!beveragesTemp)
        beveragesTemp = this.dataService.getObjectBy(this.data.data, { name: 'beverages' });
      this.startersTemp = startersTemp;
      this.mainCourseTemp = mainCourseTemp;
      this.dessertsTemp = dessertsTemp;
      this.beveragesTemp = beveragesTemp;
      this.temp.starters = [];
      this.temp.mainCourse = [];
      this.temp.desserts = [];
      this.temp.beverages = [];
      if (startersTemp) {
        for (var i = 0; i < startersTemp.subMenuList.length; i++) {
          this.temp.starters.push(startersTemp.subMenuList[i].name);
          this.starters[startersTemp.subMenuList[i].name] = startersTemp.subMenuList[i].itemsList;
        }
      }
      if (mainCourseTemp) {
        for (var j = 0; j < mainCourseTemp.subMenuList.length; j++) {
          this.temp.mainCourse.push(mainCourseTemp.subMenuList[j].name);
          this.mainCourse[mainCourseTemp.subMenuList[j].name] = mainCourseTemp.subMenuList[j].itemsList;
        }
      }
      if (dessertsTemp) {
        for (var i = 0; i < dessertsTemp.subMenuList.length; i++) {
          this.temp.desserts.push(dessertsTemp.subMenuList[i].name);
          this.desserts[dessertsTemp.subMenuList[i].name] = dessertsTemp.subMenuList[i].itemsList;
        }
      }
      if (beveragesTemp) {
        for (var i = 0; i < beveragesTemp.subMenuList.length; i++) {
          this.temp.beverages.push(beveragesTemp.subMenuList[i].name);
          this.beverages[beveragesTemp.subMenuList[i].name] = beveragesTemp.subMenuList[i].itemsList;
        }
      }

      // this.starters.veg = this.dataService.getObjectBy(startersTemp.subMenuList, { name: 'veg' });
      // this.starters.veg = this.starters.veg ? this.starters.veg.itemsList : [];
      // this.starters.paneer = this.dataService.getObjectBy(startersTemp.subMenuList, { name: 'paneer' });
      // this.starters.paneer = this.starters.paneer ? this.starters.paneer.itemsList : [];
      // this.starters.chicken = this.dataService.getObjectBy(startersTemp.subMenuList, { name: 'chicken' });
      // this.starters.chicken = this.starters.chicken ? this.starters.chicken.itemsList : [];
      // this.starters.seaFood = this.dataService.getObjectBy(startersTemp.subMenuList, { name: 'seaFood' });
      // this.starters.seaFood = this.starters.seaFood ? this.starters.seaFood.itemsList : [];

      // this.mainCourse.veg = this.dataService.getObjectBy(mainCourseTemp.subMenuList, { name: 'veg' });
      // this.mainCourse.veg = this.mainCourse.veg ? this.mainCourse.veg.itemsList : [];
      // this.mainCourse.nonVeg = this.dataService.getObjectBy(mainCourseTemp.subMenuList, { name: 'nonVeg' });
      // this.mainCourse.nonVeg = this.mainCourse.nonVeg ? this.mainCourse.nonVeg.itemsList : [];

      // this.desserts = this.dataService.getObjectBy(dessertsTemp.subMenuList, { name: 'DESSERTS' });
      // this.desserts = this.desserts ? this.desserts.itemsList : [];

      // this.beverages = this.dataService.getObjectBy(beveragesTemp.subMenuList, { name: 'DRINKS' });
      // this.beverages = this.beverages ? this.beverages.itemsList : [];

      if (!this.data.data.length) {
        this.starters.paneer = [
          {
            "itemName": "paneer manchuria",
            "orderFor": "DINEIN",
            "price": 100
          },
          {
            "itemName": "chilli paneer",
            "orderFor": "DINEIN",
            "price": 100
          },
          {
            "itemName": "paneer tikka",
            "orderFor": "DINEIN",
            "price": 100
          }
        ]
        this.starters.veg = [
          {
            "itemName": "veg manchuria",
            "orderFor": "DINEIN",
            "price": 80
          },
          {
            "itemName": "crispy Corn",
            "orderFor": "DINEIN",
            "price": 100
          },
          {
            "itemName": "veg kabab",
            "orderFor": "DINEIN",
            "price": 100
          },

        ]
        this.starters.chicken = [
          {
            "itemName": "Chicken manchuria",
            "orderFor": "DINEIN",
            "price": 150
          },
          {
            "itemName": "Chilli Chicken",
            "orderFor": "DINEIN",
            "price": 180
          },
          {
            "itemName": "Chicken 65",
            "orderFor": "DINEIN",
            "price": 180
          }
        ]
        this.starters.seaFood = [
          {
            "itemName": "Prawns Fry",
            "orderFor": "DINEIN",
            "price": 200
          },
          {
            "itemName": "Apollo Fish",
            "orderFor": "DINEIN",
            "price": 210
          },
          {
            "itemName": "Fish Fry",
            "orderFor": "DINEIN",
            "price": 180
          }
        ]
        this.mainCourse.veg = [
          {
            "itemName": "Veg Biryani",
            "orderFor": "DINEIN",
            "price": 100
          },
          {
            "itemName": "Paneer Biryani",
            "orderFor": "DINEIN",
            "price": 120
          },
          {
            "itemName": "Kaju Paneer tikka Biryani",
            "orderFor": "DINEIN",
            "price": 140
          }
        ]
        this.mainCourse.nonVeg = [
          {
            "itemName": "Chicken Biryani",
            "orderFor": "DINEIN",
            "price": 150
          },
          {
            "itemName": "Mutton Biryani",
            "orderFor": "DINEIN",
            "price": 180
          },
          {
            "itemName": "Fish Biryani",
            "orderFor": "DINEIN",
            "price": 200
          },
          {
            "itemName": "Prawns Biryani",
            "orderFor": "DINEIN",
            "price": 220
          }
        ]
        this.desserts = [
          {
            "itemName": "Gulab Jamun",
            "orderFor": "DINEIN",
            "price": 30
          },
          {
            "itemName": "DoubleKa Meeta",
            "orderFor": "DINEIN",
            "price": 40
          },
          {
            "itemName": "Fruit Salad",
            "orderFor": "DINEIN",
            "price": 50
          },
          {
            "itemName": "Chocolate Brownie",
            "orderFor": "DINEIN",
            "price": 35
          },
          {
            "itemName": "Ice Cream",
            "orderFor": "DINEIN",
            "price": 40
          }
        ]
        this.beverages = [
          {
            "itemName": "Lassi",
            "orderFor": "DINEIN",
            "price": 30
          },
          {
            "itemName": "ButterMilk",
            "orderFor": "DINEIN",
            "price": 20
          },
          {
            "itemName": "Pepsi",
            "orderFor": "DINEIN",
            "price": 25
          },
          {
            "itemName": "ThumbsUp",
            "orderFor": "DINEIN",
            "price": 25
          },
          {
            "itemName": "Sprite",
            "orderFor": "DINEIN",
            "price": 25
          },
          {
            "itemName": "Maaza",
            "orderFor": "DINEIN",
            "price": 25
          },
        ]
        this.data.data = [
          {
            "DineInList ": [
              {
                "name": "starters",
                "subMenuList": [
                  {
                    "name": "paneer",
                    "itemsList": [
                      {
                        "itemName": "paneer manchuria",
                        "orderFor": "DINEIN",
                        "price": 100
                      },
                      {
                        "itemName": "chilli paneer",
                        "orderFor": "DINEIN",
                        "price": 100
                      },
                      {
                        "itemName": "paneer tikka",
                        "orderFor": "DINEIN",
                        "price": 100
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
      this.newRecord = {};
      this.callGrid = true;
    });
  }

  addItem(a, b, c) {
    this.reload = false;
    var item;
    if (c) {
      item = this.dataService.getObjectBy(this[b][c], { itemName: a.itemName });
      if (item) {
        item.quantity = (item.quantity || 0) + 1;
      }
    } else {
      item = this.dataService.getObjectBy(this[b], { itemName: a.itemName });
      if (item) {
        item.quantity = (item.quantity || 0) + 1;
      }
    }
    item.cart = true;
    this.reload = true;
  }
  deleteItem(a, b, c) {
    this.reload = false;
    var item;
    if (c) {
      item = this.dataService.getObjectBy(this[b][c], { itemName: a.itemName });
      if (item) {
        item.quantity = item.quantity ? item.quantity - 1 : 0;
      }
    } else {
      item = this.dataService.getObjectBy(this[b], { itemName: a.itemName });
      if (item) {
        item.quantity = item.quantity ? item.quantity - 1 : 0;
      }
    }
    item.cart = item.quantity > 0 ? true : false;
    this.reload = true;
  }
  deleteMenu(menu) {
    var temp = {
      "restaurantId": this.dataService.user.businessId,
      "menuName": menu
    };
    this.dataService.getData('canteenManager/deleteMenu', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Deleting Menu', 'Ok', {
          duration: 5000,
        });
        return;
      } else {
        this.snackBar.open('Menu Deleted Successfully', 'Ok', {
          duration: 5000,
        });
        this[menu] = [];
        this.getData();
      }
    });
  }
  deleteItemFromMenu(a, b, c) {
    var temp = {
      "menuName": b,
      "restaurantId": this.dataService.user.businessId,
      "subMenuName": c,
      "itemName": a.itemName
    }
    this.dataService.getData('canteenManager/deleteMenuItemByRestaurantId', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Deleting Menu Item', 'Ok', {
          duration: 5000,
        });
        return;
      } else {
        this.snackBar.open('Menu Item Deleted Successfully', 'Ok', {
          duration: 5000,
        });
        this.getData();
      }
    });
  }
  addNewStudent(student) {
    let temp = {
      "name": student.mainMenu,
      "restaurantId": this.dataService.user.businessId,
      "subMenu": {
        "items": {
          "itemName": student.itemName,
          "orderFor": student.orderFor,
          "price": Number(student.price)
        },
        "name": student.subMenu
      }
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "canteenManager/saveMenu";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Menu', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Menu Added Succesfully', 'Ok', {
        duration: 5000,
      });
      this.getData();
      this.newRecord = {};
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

  cart() {
    this.showCart = true;
    var cartItems = [];
    this.price = 0;
    this.quantity = 0;
    for (var j = 0; j < this.temp.starters.length; j++) {
      let a = this.dataService.getObjectsBy(this.starters[this.temp.starters[j]], { cart: true });
      if (a) {
        var aTemp = [];
        for (var i = 0; i < a.length; i++) {
          var test = {
            "menuName": 'STARTERS',
            "subMenuName": this.temp.starters[j],
            "itemName": a[i].itemName,
            "price": a[i].price,
            "quantity": a[i].quantity
          }
          aTemp.push(test);
        }
        cartItems = cartItems.concat(aTemp);
      }
    }
    for (var j = 0; j < this.temp.mainCourse.length; j++) {
      let a = this.dataService.getObjectsBy(this.mainCourse[this.temp.mainCourse[j]], { cart: true });
      if (a) {
        var aTemp = [];
        for (var i = 0; i < a.length; i++) {
          var test = {
            "menuName": 'MAIN COURSE',
            "subMenuName": this.temp.mainCourse[j],
            "itemName": a[i].itemName,
            "price": a[i].price,
            "quantity": a[i].quantity
          }
          aTemp.push(test);
        }
        cartItems = cartItems.concat(aTemp);
      }
    }
    for (var j = 0; j < this.temp.desserts.length; j++) {
      let a = this.dataService.getObjectsBy(this.desserts[this.temp.desserts[j]], { cart: true });
      if (a) {
        var aTemp = [];
        for (var i = 0; i < a.length; i++) {
          var test = {
            "menuName": 'DESSERTS',
            "subMenuName": this.temp.desserts[j],
            "itemName": a[i].itemName,
            "price": a[i].price,
            "quantity": a[i].quantity
          }
          aTemp.push(test);
        }
        cartItems = cartItems.concat(aTemp);
      }
    }
    for (var j = 0; j < this.temp.beverages.length; j++) {
      let a = this.dataService.getObjectsBy(this.beverages[this.temp.beverages[j]], { cart: true });
      if (a) {
        var aTemp = [];
        for (var i = 0; i < a.length; i++) {
          var test = {
            "menuName": 'DRINKS',
            "subMenuName": this.temp.beverages[j],
            "itemName": a[i].itemName,
            "price": a[i].price,
            "quantity": a[i].quantity
          }
          aTemp.push(test);
        }
        cartItems = cartItems.concat(aTemp);
      }
    }
    // var a = this.dataService.getObjectsBy(this.starters.veg, { cart: true });
    // var b = this.dataService.getObjectsBy(this.starters.paneer, { cart: true });
    // var c = this.dataService.getObjectsBy(this.starters.chicken, { cart: true });
    // var d = this.dataService.getObjectsBy(this.starters.seaFood, { cart: true });
    // var e = this.dataService.getObjectsBy(this.mainCourse.veg, { cart: true });
    // var f = this.dataService.getObjectsBy(this.mainCourse.nonVeg, { cart: true });
    // var g = this.dataService.getObjectsBy(this.desserts, { cart: true });
    // var h = this.dataService.getObjectsBy(this.beverages, { cart: true });
    // if (a) {
    //   var aTemp = [];
    //   for (var i = 0; i < a.length; i++) {
    //     var temp = {
    //       "menuName": 'STARTERS',
    //       "subMenuName": "veg",
    //       "itemName": a[i].itemName,
    //       "price": a[i].price,
    //       "quantity": a[i].quantity
    //     }
    //     aTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(aTemp);
    // }
    // if (b) {
    //   var bTemp = [];
    //   for (var i = 0; i < b.length; i++) {
    //     var temp = {
    //       "menuName": 'STARTERS',
    //       "subMenuName": "paneer",
    //       "itemName": b[i].itemName,
    //       "price": b[i].price,
    //       "quantity": b[i].quantity
    //     }
    //     bTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(bTemp);
    // }
    // if (c) {
    //   var cTemp = [];
    //   for (var i = 0; i < c.length; i++) {
    //     var temp = {
    //       "menuName": 'STARTERS',
    //       "subMenuName": "chicken",
    //       "itemName": c[i].itemName,
    //       "price": c[i].price,
    //       "quantity": c[i].quantity
    //     }
    //     cTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(cTemp);
    // }
    // if (d) {
    //   var dTemp = [];
    //   for (var i = 0; i < d.length; i++) {
    //     var temp = {
    //       "menuName": 'STARTERS',
    //       "subMenuName": "seaFood",
    //       "itemName": d[i].itemName,
    //       "price": d[i].price,
    //       "quantity": d[i].quantity
    //     }
    //     dTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(dTemp);
    // }
    // if (e) {
    //   var eTemp = [];
    //   for (var i = 0; i < e.length; i++) {
    //     var temp = {
    //       "menuName": 'MAIN COURSE',
    //       "subMenuName": "veg",
    //       "itemName": e[i].itemName,
    //       "price": e[i].price,
    //       "quantity": e[i].quantity
    //     }
    //     eTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(eTemp);
    // }
    // if (f) {
    //   var fTemp = [];
    //   for (var i = 0; i < f.length; i++) {
    //     var temp = {
    //       "menuName": 'MAIN COURSE',
    //       "subMenuName": "nonVeg",
    //       "itemName": f[i].itemName,
    //       "price": f[i].price,
    //       "quantity": f[i].quantity
    //     }
    //     fTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(fTemp);
    // }
    // if (g) {
    //   var gTemp = [];
    //   for (var i = 0; i < g.length; i++) {
    //     var temp = {
    //       "menuName": 'DESSERTS',
    //       "subMenuName": "desserts",
    //       "itemName": g[i].itemName,
    //       "price": g[i].price,
    //       "quantity": g[i].quantity
    //     }
    //     gTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(gTemp);
    // }
    // if (h) {
    //   var hTemp = [];
    //   for (var i = 0; i < h.length; i++) {
    //     var temp = {
    //       "menuName": 'DRINKS',
    //       "subMenuName": "beverages",
    //       "itemName": h[i].itemName,
    //       "price": h[i].price,
    //       "quantity": h[i].quantity
    //     }
    //     hTemp.push(temp);
    //   }
    //   cartItems = cartItems.concat(hTemp);
    // }
    for (var x = 0; x < cartItems.length; x++) {
      this.price = this.price + (cartItems[x].price * cartItems[x].quantity);
      this.quantity = this.quantity + cartItems[x].quantity;
    }

    this.cartItems = cartItems;
    this.flip();
    this.showCart = true;
  }
  submitOrder() {
    var objTemp = {
      "restaurantId": this.dataService.user.businessId,
      "date": this.dataService.convertDate(new Date, true),
      "totalAmount": this.price,
      "paymentMode": this.paymentMode || 'cash',
      "itemDetailsList": this.cartItems
    }
    this.dataService.getData('canteenManager/saveOrder', objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Placing Order', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Order Placed Succesfully', 'Ok', {
        duration: 5000,
      });

      var temp = '<center><h2>Order Details</h2><table style="font-size: 20px;width:50%;border-collapse:collapse;border:1px solid black"><tr><td><b>Item Name</b></td><td><b>Quantity</b></td><td> <b>Price (Rs)</b></td></tr><tbody style="max-height:100px">';

      for (var i = 0; i < this.cartItems.length; i++) {
        temp = temp + '<tr><td>' + this.cartItems[i].itemName + '</td><td>' + this.cartItems[i].quantity + '</td><td>' + this.cartItems[i].price + '</td></tr>';
      }

      temp = temp + '</tbody><tr><td> <b class="danger">Total</b></td><td> <b>' + this.quantity + '</b></td><td> <b>' + this.price + '</b></td></tr></table></center>';

      var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=900,height=700");
      myWindow.document.write(temp);
      myWindow.print();
      this.cartItems = [];
      this.customerPhone = '';
      this.customerName = '';
      this.price = 0;
      this.quantity = 0;
      this.getData();
      this.flip();
    });
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
    this.showCart = false;
  } MSFIDOCredentialAssertion
}
