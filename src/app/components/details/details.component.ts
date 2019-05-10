import { Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dataService: DataService,public dialogRef:MatDialogRef<DetailsComponent>) { }

  ngOnInit() {
    //console.log('details init');
  }

  cancel() {
    //console.log('cancel');
  }
}
