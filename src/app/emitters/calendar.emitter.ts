import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Check } from './../enumerators/check.enum';

@Injectable()
export class CalendarEmitter {

  private calendarEmitter: EventEmitter<object> = new EventEmitter<object>();
  private uncheckEmitter: EventEmitter<object> = new EventEmitter<object>();

  constructor() {

  }

  public datePicked(date: Date, check: Check, days?: number): void {
    this.calendarEmitter.emit({
      date,
      check,
      days
    });
  }

  public datePicked$(): Observable<any> {
    return this.calendarEmitter.asObservable();
  }

  public uncheck(uncheck: boolean, date: Date): void {
    this.uncheckEmitter.emit({
      uncheck,
      date
    });
  }

  public uncheck$(): Observable<any> {
    return this.uncheckEmitter.asObservable();
  }

}
