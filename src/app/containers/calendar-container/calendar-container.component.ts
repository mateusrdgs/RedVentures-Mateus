import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.styl']
})
export class CalendarContainerComponent implements OnInit {

  @Input() alreadySubscribed: boolean;

  constructor() { }

  ngOnInit() {
  }

}
