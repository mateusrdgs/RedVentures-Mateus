import { Injectable, EventEmitter } from '@angular/core';

import { Check } from './../enumerators/check.enum';

@Injectable()
export class CalendarEmitter {

  private calendarEmitter: EventEmitter<object> = new EventEmitter<object>();

  constructor() {

  }

  public datePicked(date: Date, check: Check, days?: number) {
    this.calendarEmitter.emit({
      date,
      check,
      days
    });
  }

  public datePicked$() {
    return this.calendarEmitter.asObservable();
  }

}
