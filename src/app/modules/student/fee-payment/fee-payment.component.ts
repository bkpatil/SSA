import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'fee-payment',
  templateUrl: './fee-payment.component.html',
  styleUrls: ['./fee-payment.component.scss']
})
export class FeePaymentComponent implements OnInit {
  height: any;
  bus: any;
  college: any;
  details: any = {};
  feeDetails: any = {};
  showDetails: boolean = false;
  constructor(private dataService: DataService) { }
  user: any;
  ngOnInit() {
    this.user = this.dataService.user;
    this.height = ($('.nav-list')[0].offsetTop - $('.students-view .card')[0].offsetTop) - 82;
    let url = '';
    if (this.dataService.user.roleId == '6')
      url = 'student/viewCollageFeeDueDetails';
    else
      url = 'student/viewCollageFeeDetailsForParent';
    this.dataService.getData(url, { "userName": this.dataService.user.userName }).subscribe(results => {
      if (!results || results.code === -1) {
        this.feeDetails = [];
        this.showDetails = false;
      } else {
        this.feeDetails = results.data;
        this.showDetails = true;
      }
    });
  }

}
