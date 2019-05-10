import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'results-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class RPopupComponent implements OnInit {
  initialData = {};
  photoField: any;
  user: any;
  rowspan: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<RPopupComponent>) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.initialData = this.data.data;
    this.data.dob = this.dataService.convertDate(this.data.dob,false);
    if (this.data.details) {
      this.photoField = this.data.fields.unshift();
    }
  }

  saveProfile(){
		let url = '';
		if (this.user.selectedRole === 'Admin') {
			url = 'admin/editProfile';
		}
		else if (this.user.selectedRole === 'Library') {
			url = 'library/editProfile';
		}
		else if (this.user.selectedRole === 'Student') {
			url = 'student/editProfile';
		}
		else if (this.user.selectedRole === 'Professor') {
			url = 'professor/editProfile';
		}
		else if (this.user.selectedRole === 'HOD') {
			url = 'hod/editProfile';
    }
    delete this.data.lastname;
    this.data.yearPeriod = this.data.yearJoined;
    delete this.data.yearJoined;
		this.data.dob = this.dataService.convertDate(this.data.dob,true);
		this.dataService.getData(url, this.data).subscribe(results => {
			if (!results || results.code === -1) {
				this.snackBar.open('Problem in updating profile', 'Ok', {
					duration: 5000,
				  });
			} else
			this.snackBar.open('Profile Updated Succesfully', 'Ok', {
				duration: 5000,
			  });

		  });
  }
  printResults(){
    var loop = '';
    for(var i =0;i<this.data.subjects.length;i++){
      loop = loop + '<tr><td style="padding-left:10px">'+this.data.subjects[i]+'</td><td style="padding-left:10px">'+ this.data.marks[this.data.subjects[i]]+'</td></tr>';
    }
    var invoice = '<form class="popup-form"><div class="row popup-header">Results Details</div><table style="margin-top:10px; width:60%"><tr><td><h4><b>Student Name: </b></h4></td><td><h4>'+ this.data.studentName+'</h4></td></tr><tr><td><h4><b>Results: </b></h4></td><td><h4>'+ this.data.results+'</h4></td></tr></table><br/><table style="font-size:14px;width:80%" border="1"><tr><td style="padding-left:10px"><b>Subject</b></td><td style="padding-left:10px"><b>Marks</b></td></tr>'+loop+'</table></form>';
        var myWindow = window.open("", "MsgWindow", "top=" + 30 + ",left=" + 30 + ",width=900,height=700");
        myWindow.document.write(invoice);
        myWindow.print();
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
