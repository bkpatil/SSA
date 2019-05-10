import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { DataService } from './../../../services/data.service';

@Component({
  selector: 'calendar-widget',
  templateUrl: './calendar-widget.component.html',
  styleUrls: ['./calendar-widget.component.scss']
})
export class CalendarWidgetComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private dataService: DataService) { }
  convertDate(date) {
    let d = new Date(date);
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${year}-${month}-${day}`;
  }
  ngOnInit() {
    let url = 'admin/viewHolidays';
    this.dataService.getData(url, { "businessId": this.dataService.user.businessId }).subscribe(results => {
      let events = [];
      if (results.code !== -1) {
        for (var i = 0; i < results.data.length; i++) {
          let temp: any = {};
          var current = new Date(results.data[i].toDate); //'Mar 11 2015' current.getTime() = 1426060964567
          var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
          followingDay.toLocaleDateString();
          temp.title = results.data[i].reason;
          temp.start = this.convertDate(results.data[i].fromDate);
          temp.end = this.convertDate(followingDay);
          events.push(temp);
        }
      }
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        contentHeight: 490,
        events: events
        //   events:  [
        //     {
        //       title: 'All Day Event',
        //       start: '2018-08-01'
        //     },
        //     {
        //       title: 'Long Event',
        //       start: '2018-08-08',
        //       end: '2018-08-10'
        //     },
        //     {
        //       id: 999,
        //       title: 'Repeating Event',
        //       start: '2018-08-09T16:00:00'
        //     },
        //     {
        //       id: 999,
        //       title: 'Repeating Event',
        //       start: '2018-08-16T16:00:00'
        //     },
        //     {
        //       title: 'Conference',
        //       start: '2018-08-11',
        //       end: '2018-08-13'
        //     },
        //     {
        //       title: 'Meeting',
        //       start: '2018-08-12T10:30:00',
        //       end: '2018-08-12T12:30:00'
        //     },
        //     {
        //       title: 'Lunch',
        //       start: '2018-08-12T12:00:00'
        //     },
        //     {
        //       title: 'Meeting',
        //       start: '2018-08-12T14:30:00'
        //     },
        //     {
        //       title: 'Happy Hour',
        //       start: '2018-08-12T17:30:00'
        //     },
        //     {
        //       title: 'Dinner',
        //       start: '2018-08-12T20:00:00'
        //     },
        //     {
        //       title: 'Birthday Party',
        //       start: '2018-08-13T08:00:00'
        //     },
        //     {
        //       title: 'Click for Google',
        //       url: 'http://google.com/',
        //       start: '2018-08-28'
        //     }
        //   ]
      };
    });

  }
  clearEvents() {
    //this.events = [];
  }
  loadEvents() {
    // this.eventService.getEvents().subscribe(data => {
    //   this.events = data;
    // });
  }
  clickButton() {
  }
}
