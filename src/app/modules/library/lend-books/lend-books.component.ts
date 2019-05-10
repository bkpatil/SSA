import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lend-books',
  templateUrl: './lend-books.component.html',
  styleUrls: ['./lend-books.component.scss']
})
export class LendBooksComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  addFields: any = [];
  books: any = [];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };

    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.dataService.getData('library/getBooksByBusinessId', this.data.objTemp).subscribe(results => {
      let books = [];
      if (!results || results.code === -1) {
        books = [];
      } else
        books = results.data ? results.data : [];
      for (var x = 0; x < books.length; x++) {
        this.books.push({
          id: books[x].bookId
        });
      }
      this.addFields = [
        {
          field: 'studentId',
          label: 'Student Id',
          element: 'input',
          hide: false,
          editable: false
        },
        {
          field: 'bookId',
          label: 'Book Id',
          element: 'dropdown',
          hide: false,
          editable: true,
          values: this.books
        }
      ];  
    });
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
    let url = 'library/getAllLendBooks';
    this.data.url = url;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.data.columns = ['bookId', 'bookName','studentId','startDay'];
    this.fields = [
      {
        field: 'author',
        label: 'Author Name',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'bookId',
        label: 'Book Id',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'bookName',
        label: 'Book Name',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'publishedYear',
        label: 'Published Year',
        element: 'dropdown',
        hide: false,
        editable: true,
        values: this.years
      },
      {
        field: 'location',
        label: 'Location',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'startDay',
        label: 'Start Day',
        element: 'date',
        hide: false,
        editable: true
      },
      {
        field: 'studentId',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: true
      }
    ];

     this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
        this.data.data = results.data ? results.data : [];
      //this.data.dynamicColumns = true;
      //this.data.updatable = true;
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent(student) {
    let temp = {
      "bookId": student.bookId,
      "studentId": student.studentId,
      // "businessId": this.dataService.user.businessId
    }
    //"nextPaymentDate": this.dataService.convertDate(student.nextPaymentDate, true),

    let url = "library/lendBooks";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Record', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'library/getAllLendBooks';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        // this.data.dynamicColumns = true;
        this.snackBar.open('Record Added Succesfully', 'Ok', {
          duration: 5000,
        });
        this.dataService.getDetails();

      });

    });

    // this.data.data.push(this.newRecord);

  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

}
