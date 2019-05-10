import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  initialData = {};
  photoField: any;
  user: any;
  rowspan: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<PopupComponent>) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.initialData = this.data.data;
    if (this.data.details) {
      this.photoField = this.data.fields.unshift();
    }
    this.rowspan = this.data.fields.length;
  }

  private addDetail() {
    var temp = {};
    for (var i = 0; i < this.data.fields.length; i++) {
      var field = this.data.fields[i];
      if (field.element === 'date') {
        temp[field.field] = this.data.data[field.field] ? this.dataService.convertDate(this.data.data[field.field], true) : 0;
      }
      else if (field.type === 'boolean') {
        temp[field.field] = this.data.data[field.field] == 'True' || this.data.data[field.field] == 1 ? 1 : 0;
      }
      else {
        temp[field.field] = this.data.data[field.field] === null ? '' : this.data.data[field.field];
      }
      if(field.multiple){
        temp[field.field] = this.data.data[field.field].join(',');
      }
    }
    temp = { ...temp, ...this.data.moreProperties };
    this.dataService.getData(this.data.updateUrl, temp).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Error In Updation', 'Ok', {
          duration: 5000,
        });
        return;
      }
      this.closePopup();
      // this.data.gridData.data = results.splice(0, 10);
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
