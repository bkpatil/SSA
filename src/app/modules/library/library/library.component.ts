import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  tempUser: any = {};
  book: any;
  addFields: any;
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.search('');
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i + '' });
    };
    this.addFields = [
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
      }
    ];
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
    this.data.deletable = true;
  }
  search(book) {
    let url = '';
    if (book) {
      url = 'library/getBookByName';
      this.data.url = url;
      this.data.objTemp = { "bookName": book };
      this.data.data = [];
      this.fields = [];
      this.callGrid = false;
      this.dataService.getData(url, this.data.objTemp).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
        } else
          this.data.data = results ? results : [];
        this.data.updatable = false;
        this.fields = [];
        this.data.columns = [];
        this.fields = [
          {
            field: 'authorName',
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
            field: 'status',
            label: 'Status',
            element: 'input',
            hide: false,
            editable: true
          },
          {
            field: 'location',
            label: 'Location',
            element: 'input',
            hide: false,
            editable: true
          },

        ];

        this.tempUser = this.dataService.user;
        this.newRecord = {};
        this.callGrid = true;
        book = '';
      });
    }
    else {
      url = 'library/getBooksByBusinessId';
      this.data.url = url;
      this.data.data = [];
      this.fields = [];
      this.callGrid = false;
      this.data.updatable = false;
      this.data.objTemp = { "businessId": this.dataService.user.businessId };
      this.dataService.getData(url, this.data.objTemp).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
        } else
          this.data.data = results.data ? results.data : [];
        this.data.columns = ['bookId', 'bookName', 'author', 'publishedYear', 'location'];
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
        this.tempUser = this.dataService.user;
        if (this.tempUser.roleId == '3') {
          this.data.updatable = true;
          // this.fields.push({
          //   field: 'actions',
          //   label: 'Actions',
          //   element: '',
          //   hide: false,
          //   editable: true
          // });
        }
        this.newRecord = {};
        this.callGrid = true;
        book = '';
      });
    }

  }

  addNewStudent(student) {
    let temp = {
      "bookName": student.bookName,
      "location": student.location,
      "bookId": student.bookId,
      "author": student.author,
      "publishedYear": student.publishedYear,
      "businessId": this.dataService.user.businessId
    }

    let url = "library/addBook";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Book', 'Ok', {
          duration: 5000,
        });
        return;
      }
      let urlFull = 'library/getBooksByBusinessId';
      this.newRecord = {};
      this.dataService.getData(urlFull, { "businessId": this.dataService.user.businessId }).subscribe(results => {
        if (!results || results.code === -1) {
          this.data.data = [];
          return;
        }
        this.flip();
        this.data.data = results.data;
        // this.fields = [];
        // this.data.dynamicColumns = true;
        this.snackBar.open('Book Added Succesfully', 'Ok', {
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
