import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { DataService } from './../../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'add-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() fields: any;
  @Input() newRecord: any;
  @Input() button: any;
  @Input() editable: any;
  @Input() url?: any;
  @Output() onAdd = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  constructor(private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    for (var i = 0; i < this.fields.length; i++) {
      if (this.fields[i].element === 'date') {
        this.newRecord[this.fields[i].field] = new Date(this.newRecord[this.fields[i].field]);
      }
      else if (this.fields[i].element === 'dropdown' && this.fields[i].multiple === true && this.newRecord[this.fields[i].field]) {
        this.newRecord[this.fields[i].field] = this.newRecord[this.fields[i].field].split(',');
      }
    }
  }

  onSubmit() {
    this.onAdd.emit(this.newRecord);
  }

  cancel() {
    this.newRecord = {};
    this.onCancel.emit(this.newRecord);
  }
  getValues(field) {
    let returnValues = [];
    let dependantField = this.dataService.getObjectBy(this.fields, { field: field.dependsOn });
    if (dependantField) {
      let tempObj = {};
      tempObj[dependantField.field] = this.newRecord[dependantField.field];
      returnValues = this.dataService.getObjectsBy(field.values, tempObj);
    }
    return returnValues;
  }

  public onFileInput($event, field) {
    const fileSelected: File = $event.target.files[0];
    const _formData = new FormData();
    _formData.append('file', fileSelected, fileSelected.name);
    var url = field.url || this.url || 'library/uploadfile';
    this.http.post('http://13.233.80.43:8080/collage-management/collage/' + url, _formData)
      .subscribe(
        (data: any) => {
          this.newRecord[field.field] = data.data;
          console.log(data);
        },
        error => {
          console.log(error);
          this.newRecord[field.field] = error.error.text;
        },
    );

  }

  public onImageInput($event, field) {
    const fileSelected: File = $event.target.files[0];
    const _formData = new FormData();
    _formData.append('file', fileSelected, fileSelected.name);
    this.http.post('http://13.127.118.40:8080/collage-management/collage/library/uploadfile', _formData)
      .subscribe(
        (data: any) => {
          this.newRecord[field.field] = data.data;
        },
        error => {
          console.log(error);
          this.newRecord[field.field] = error.error.text;
        },
    );

  }
}
