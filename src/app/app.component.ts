import { Component, OnInit, HostListener } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DataService } from './services/data.service';
declare var jquery: any;
declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
