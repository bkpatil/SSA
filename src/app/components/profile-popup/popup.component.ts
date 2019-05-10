import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'profile-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PPopupComponent implements OnInit {
  initialData = {};
  photoField: any;
  user: any;
  rowspan: any;
  profile: any;
  showPic: boolean = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public snackBar: MatSnackBar, private dataService: DataService, public dialogRef: MatDialogRef<PPopupComponent>) { }

  ngOnInit() {
    this.user = this.dataService.user;
    this.initialData = this.data.data;
    let d = new Date(this.data.dob);
    this.data.dob = new Date(this.data.dob);
    if (this.data.details) {
      this.photoField = this.data.fields.unshift();
    }
  }
  public onImageInput($event, field) {
    this.showPic = false;
    const fileSelected: File = $event.target.files[0];
    const _formData = new FormData();
    _formData.append('file', fileSelected, fileSelected.name);
    this.http.post('http://13.127.118.40:8080/collage-management/collage/library/uploadfile', _formData)
      .subscribe(
        (data: any) => {
          this.data.profilePic = data.data;
          this.showPic = true;
        },
        error => {
          console.log(error);
          this.data.profilePic = error.error.text;
        },
    );

  }

  saveProfile() {
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
    this.data.lastName = this.data.lastname;
    delete this.data.lastname;
    if (this.dataService.user.selectedRole !== 'Professor' && this.user.selectedRole !== 'Library') {
      this.data.yearPeriod = this.data.yearJoined;
      delete this.data.yearJoined;
    }

    delete this.data.studentId;
    var date: any = new Date(this.data.dob),
      longFormat: any = date * 1;
    this.data.dob = longFormat;
    this.data.userName = this.dataService.user.userName;
    if (this.user.selectedRole === 'HOD') {
      var temp = {
        profilePic: this.data.profilePic,
        name: this.data.Name,
        department: this.data.department,
        email: this.data.email,
        employeeId: this.data.employeeId,
        qualification: this.data.qualification,
        userName: this.dataService.user.userName
      }
      this.data = temp;
    }
    this.dataService.getData(url, this.data).subscribe(results => {
      if (!results || results.code === -1) {
        this.snackBar.open('Problem in updating profile', 'Ok', {
          duration: 5000,
        });
      } else
        this.snackBar.open('Profile Updated Succesfully', 'Ok', {
          duration: 5000,
        });
      this.closePopup();
    });
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
      if (field.multiple) {
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
