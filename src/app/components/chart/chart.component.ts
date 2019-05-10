import { Component, Input, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  data: Object;
  @Input() config: any;
  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {};
    }
  }
  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }
}
