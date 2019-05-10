import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from './../../services/data.service';
declare var jquery: any;
declare var $: any;
@Component({
	selector: 'applications-list',
	templateUrl: './applications-list.component.html',
	styleUrls: ['./applications-list.component.scss']
})
export class ApplicationsListComponent implements OnInit {
	@Output() onselect = new EventEmitter();
	@Input() applications;

	constructor(private dataService: DataService) {

	}

	itemSelected(item) {
		if (!item.active) {
			this.applications.forEach(function (listItem) {
				listItem.active = false;
			});
			item.active = true;
			this.onselect.emit(item);
		}
		this.dataService.selectedApp = item;
	}

	ngOnInit() {
		if (this.applications && this.applications.length) {
			this.itemSelected(this.applications[0]);
		}
	}
}
