import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;
import { MatSnackBar } from '@angular/material';
import { CPopupComponent } from './../../../components/compose-popup/popup.component';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';

@Component({
  selector: 'email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  frontVisible: boolean = true;
  user: any;
  height: any;
  data: any = {};
  callGrid: boolean;
  fields: any = [];
  newRecord: any = {};
  years: any = [];
  mails: any;
  activeMail: any;
  composeMail: any;
  displayTrue: any = false;
  constructor(private dataService: DataService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.height = ($('.nav-list')[0].offsetTop - $('table')[0].offsetTop)
    this.getData();
    let today = new Date();
    for (let i = 1990; i <= today.getFullYear(); i++) {
      this.years.push({ id: i });
    };
  }

  ngAfterContentChecked() {
    this.getHeightWidth();
  }
  getHeightWidth() {
    let height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop),
      width = $('.sidenav-body')[0].offsetWidth;
    this.data.width = width - 45;
    this.data.height = height - 82;;
    this.data.showFilter = true;
    this.data.showFooter = false;
    this.data.updatable = true;
    this.data.deletable = true;
  }

  getData() {
    this.displayTrue = false;
    let url = 'email/mails';
    this.data.url = url;
    this.data.objTemp = {
      "businessId": this.dataService.user.businessId,
      "userName": this.dataService.user.userName
    };
    this.dataService.getData(url, this.data.objTemp).subscribe(results => {
      if (!results || results.code === -1) {
        this.data = [];
      } else
        this.data = results.data;

      this.newRecord = {};
      this.displayTrue = true;
      this.inbox();
    });
  }

  compose() {
    this.composeMail = true;
    var data = {
      "sender": this.dataService.user.userName,
      "receiver": "",
      "subject": "",
      "message": "",
      "time": this.dataService.convertDate(new Date(), true),
      "label": "",
      "businessId": this.dataService.user.businessId,
      "userName": this.dataService.user.userName
    };
    let dialogRef = this.dialog.open(CPopupComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getData();
    });
  }
  inbox() {
    this.composeMail = false;
    this.mails = this.data.inbox;
    this.activeMail = this.mails && this.mails.length ? this.mails[0] : false;
  }
  sent() {
    this.composeMail = false;
    this.mails = this.data.sentBox;
    this.activeMail = this.mails && this.mails.length ? this.mails[0] : false;
  }

  convertTime(time) {
    var d = new Date(time);
    return d.toString().substring(0, 25);
  }

  setActiveMail(mail) {
    this.displayTrue = false;
    this.activeMail = mail;
    this.displayTrue = true;
  }

}
