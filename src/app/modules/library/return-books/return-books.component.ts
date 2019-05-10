import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'return-books',
  templateUrl: './return-books.component.html',
  styleUrls: ['./return-books.component.scss']
})
export class ReturnBooksComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord:any = {};
  years:any =[];
  books:any = [];
  constructor(private dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.dataService.user;
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
      this.fields = [
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
    this.data.width = width-45;
    this.data.height = height - 82;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  addNewStudent(student) {
    let temp = {
      "bookId": student.bookId,
      "studentId": student.studentId,
      // "businessId": this.dataService.user.businessId
    }
    let url = "library/returnBooks";
    this.dataService.getData(url, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error Adding Record', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.snackBar.open('Record Added Succesfully', 'Ok', {
        duration: 5000,
      });
      this.newRecord = {};
    });

    // this.data.data.push(this.newRecord);

  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

}
