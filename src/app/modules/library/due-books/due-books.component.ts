import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'due-books',
  templateUrl: './due-books.component.html',
  styleUrls: ['./due-books.component.scss']
})
export class DueBooksComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord:any = {};
  years:any =[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({id:i});
    };
  }
  ngAfterContentChecked(){
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width-45;
    this.data.height = height - 82;;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }
  getData() {
    this.callGrid = false;
    let url = 'library/getDueBooks';
    this.data.url = url;
    this.data.objTemp = { "businessId": this.dataService.user.businessId };
    this.fields = [
      {
        field: 'id',
        label: 'Student Id',
        element: 'input',
        hide: false,
        editable: false
      },
      {
        field: 'name',
        label: 'Student Name',
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
        field: 'dueDate',
        label: 'Due Date',
        element: 'date',
        hide: false,
        editable: true
      },
      {
        field: 'email',
        label: 'Email',
        element: 'input',
        hide: false,
        editable: true
      },
      {
        field: 'contactNumber',
        label: 'Contact',
        element: 'number',
        hide: false,
        editable: true
      },
      {
        field: 'actions',
        label: 'Actions',
        element: '',
        hide: false,
        editable: true
      }
    ];
    
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data.data = [];
      } else
      this.data.data = results.data ? results.data : [];
      this.newRecord = {};
      this.callGrid = true;
    });
  }


  addNewStudent (student){
    this.data.data.push(this.newRecord);
    this.flip();
  }
  flip() {
    $('.card').toggleClass('flipped');
    this.frontVisible = !this.frontVisible;
  }

}
