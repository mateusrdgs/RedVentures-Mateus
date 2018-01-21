import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { CalendarEmitter } from './../../emitters/calendar.emitter';

import { Check } from './../../enumerators/check.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.styl']
})
export class CheckComponent implements OnInit {

  private datePickSubscription: Subscription;
  public CheckIn = 'Choose a date';
  public CheckOut = 'Choose a date';


  constructor(
    private _calendarEmitter: CalendarEmitter,
    private _datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.startDatePickingSubscription();
  }

  startDatePickingSubscription(): void {
    this.datePickSubscription
      = this._calendarEmitter.datePicked$()
        .subscribe((datePicked: {date: Date, check: Check}) => {
          if (datePicked.check === Check.In) {
            this.CheckIn = this._datePipe.transform(datePicked.date.toLocaleDateString(), 'longDate');
          } else {
            this.CheckOut = this._datePipe.transform(datePicked.date.toLocaleDateString(), 'longDate');
          }
        });
  }

}
