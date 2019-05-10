import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'fee-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class FPopupComponent implements OnInit {
  initialData = {};
  photoField: any;
  user: any;
  rowspan: any;
  feeType: any;
  transactionId: any;
  cardNumber: any;
  payMode: any;
  amount: any;
  year: any;
  semester: any;
  date1: any;
  date2: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<FPopupComponent>) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.initialData = this.data.data;
    this.data.dob = this.dataService.convertDate(this.data.dob, false);
    if (this.data.details) {
      this.photoField = this.data.fields.unshift();
    }
  }

  clearPayment() {
    this.amount = '';
    this.transactionId = '';
    this.year = '';
    this.semester = '';
    this.payMode = '';
    this.feeType = '';
  }
  submitPayment() {
    var temp = {
      "studentId": this.data.StudentId,
      "businessId": this.dataService.user.businessId,
      "semesterPayment": [{
        "year": this.data.year + '',
        "semester": this.data.semester + '',
        "hostelFee": this.feeType === 3 ? this.amount : '',
        "collageFee": this.feeType === 1 ? this.amount : '',
        "transportFee": this.feeType === 2 ? this.amount : '',
        "payMode": this.payMode === 1 ? 'cash' : 'card',
        "currentPaymentDate": this.dataService.convertDate(new Date, true),
        "nextPaymentDate": this.data['Next PaymentDate'],
        "transactionId": this.transactionId
      }]
    }
    this.data.objTemp = temp;
    // var temp = {
    //   "studentId": this.data.StudentId,
    //   "businessId": this.dataService.user.businessId,
    //   "year": this.year + '',
    //   "semester": this.semester + '',
    //   "hostelFee": this.feeType === 3 ? this.amount : '',
    //   "collegeFee": this.feeType === 1 ? this.amount : '',
    //   "transportFee": this.feeType === 2 ? this.amount : '',
    //   // "examFee": this.feeType === 4 ? this.amount : '',
    //   "payMode": this.payMode === 1 ? 'cash' : 'card',
    //   "transactionId": this.transactionId
    // }
    var fee = '';
    if (this.feeType === 1) {
      fee = 'Collage';
    } else if (this.feeType === 2) {
      fee = "Transport"
    } else if (this.feeType === 3) {
      fee = "Hostel";
    }
    var mode = this.payMode === 1 ? 'cash' : 'card';
    this.dataService.getData('accounts/payStudentFee', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Problem in updating Student Fee Details', 'Ok', {
          duration: 5000,
        });
      }
      else {
        var invoice = '<h2><table style="width:80%;"><tr><td> <b>Student Id:</b></td><td>' + results.data.studentId + '</td><td> <b>Student Name</b></td><td>' + results.data.studentName + '</td></tr><tr><td> <b>Total Fee:</b></td><td>' + this.data['Total Amount'] + '</td><td> <b>Pending Fee</b></td><td>' + results.data.semesterPayment[0].amountToBePaid + '</td></tr><tr><td> <b>Fee Paid:</b></td><td>' + results.data.semesterPayment[0].amountPaid + '</td><td> <b>Next Payment Date</b></td><td>' + this.dataService.convertDate(this.data.objTemp.nextPaymentDate, false) + '</td></tr></table></h2><h2> <b>Payment Details</b></h2><table style="width:60%;border-collapse: collapse;" border=1><tr><td><b>Date</b></td><td><b>Fee Type</b></td><td><b>Payment Mode</b></td><td><b>Amount</b></td></tr><tr><td>' + this.dataService.convertDate(results.data.semesterPayment[0].currentPaymentDate, false) + '</td><td>' + fee + '</td><td>' + mode + '</td><td>' + this.amount + '</td></tr></table><br/><center><h3>Thank You For the Payment.</h3></center>';
        var left = 30, top = 10;
        var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=700,height=700");
        myWindow.document.write(invoice);
        myWindow.print();
        // var w = window.open('#/receipt' + invoice, '', "top=" + 30 + ",left=" + 30 + ",width=325,height=700");
      }
      this.closePopup();
    });
  }
  editPayment() {
    var date: any = new Date(this.date1),
      longFormat: any = date * 1;
      var date: any = new Date(this.date2),
      longFormat1: any = date * 1;
    var temp = {
      "studentId":this.data['StudentId'],
      "businessId": this.dataService.user.businessId,
      "semesterPayment": [{
        "amountPaid": this.data.amountPaid,
        "amountToBePaid": this.data.amountToBePaid,
        "year": this.data.year,
        "semester": this.data.semester,
        "hostelFee": this.data.hostelFee,
        "collageFee": this.data.collageFee,
        "transportFee": this.data.transportFee,
        "payMode": this.payMode === 1 ? 'cash' : 'card',
        "currentPaymentDate": longFormat,
        "nextPaymentDate": longFormat1,
        "transactionId": this.data.transactionId
      }]
    };

    this.data.objTemp = temp;
    this.dataService.getData('accounts/editFeeDetails', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Problem in updating Fee Details', 'Ok', {
          duration: 5000,
        });
      }
      else {
        this.snackBar.open('Fee Details Updated', 'Ok', {
          duration: 5000,
        });
        // var invoice = '<h2><table style="width:80%;"><tr><td> <b>Student Id:</b></td><td>' + results.data.studentId + '</td><td> <b>Student Name</b></td><td>' + results.data.studentName + '</td></tr><tr><td> <b>Total Fee:</b></td><td>' + this.data['Total Amount'] + '</td><td> <b>Pending Fee</b></td><td>' + results.data.semesterPayment[0].amountToBePaid + '</td></tr><tr><td> <b>Fee Paid:</b></td><td>' + results.data.semesterPayment[0].amountPaid + '</td><td> <b>Next Payment Date</b></td><td>' + this.dataService.convertDate(this.data.objTemp.nextPaymentDate, false) + '</td></tr></table></h2><h2> <b>Payment Details</b></h2><table style="width:60%;border-collapse: collapse;" border=1><tr><td><b>Date</b></td><td><b>Fee Type</b></td><td><b>Payment Mode</b></td><td><b>Amount</b></td></tr><tr><td>' + this.dataService.convertDate(results.data.semesterPayment[0].currentPaymentDate, false) + '</td><td>' + fee + '</td><td>' + mode + '</td><td>' + this.amount + '</td></tr></table><br/><center><h3>Thank You For the Payment.</h3></center>';
        // var left = 30, top = 10;
        // var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=700,height=700");
        // myWindow.document.write(invoice);
        // myWindow.print();
        // var w = window.open('#/receipt' + invoice, '', "top=" + 30 + ",left=" + 30 + ",width=325,height=700");
      }
      this.closePopup();
    });
  }
  private closePopup() {
    this.data.update = true;
    this.dialogRef.close(this.data);
  }

  private clearPopupData() {
    this.data.data = this.initialData;
  }

}
