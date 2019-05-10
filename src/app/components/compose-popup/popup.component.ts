import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'compose-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class CPopupComponent implements OnInit {
  initialData = {};
  photoField: any;
  user: any;
  rowspan: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<CPopupComponent>) { }

  ngOnInit() {
    
  }

  sendMail() {
    this.dataService.getData('email/compose', this.data).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error In Sending Mail', 'Ok', {
          duration: 5000,
        });
      } else
        this.snackBar.open('Mail Sent Succesfully', 'Ok', {
          duration: 5000,
        });
    });
    this.closePopup();
  }

  messageChange(e){
    this.data.message = e.target.value;
  }
  private closePopup() {
    this.dialogRef.close(this.data);
  }

  private clearPopupData() {
    this.data.data = this.initialData;
  }

}
