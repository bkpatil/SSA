import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'fee-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class EPopupComponent implements OnInit {
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
  date: any;
  paidAmount; any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<EPopupComponent>) { }

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
    var date: any = new Date(this.date),
      longFormat: any = date * 1;
    var temp = {
      "employeeId": this.data['EmployeeId'],
      "businessId": this.dataService.user.businessId,
      "monthlySalary": [{
        "pendingAmount": this.amount,
        "paidDate": longFormat
      }]
    }

    this.data.objTemp = temp;
    this.dataService.getData('accounts/editSalaryDetails', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Problem in updating Employee Details', 'Ok', {
          duration: 5000,
        });
      }
      else {
        this.snackBar.open('Employee Salary Details Updated', 'Ok', {
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

  edit() {
    var date: any = new Date(this.date),
      longFormat: any = date * 1;

    var temp = {
      "employeeId": this.data['EmployeeId'],
      "businessId": this.dataService.user.businessId,
      "monthlySalary": [{
        "pendingAmount": this.amount,
        "paidAmount": this.paidAmount,
        "paidDate": longFormat
      }]
    }

    this.data.objTemp = temp;
    this.dataService.getData('accounts/payEmployeeSalary', temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Problem in updating Employee Details', 'Ok', {
          duration: 5000,
        });
      }
      else {
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
