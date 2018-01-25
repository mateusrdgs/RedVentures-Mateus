import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import { CalendarEmitter } from './../../emitters/calendar.emitter';
import { CheckoutEmitter } from './../../emitters/checkout.emitter';

import { Check } from './../../enumerators/check.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.styl']
})
export class CheckComponent implements OnInit, OnDestroy {

  private datePickSubscription: Subscription;
  public CheckIn: string;
  public CheckOut: string;
  public days: number;

  constructor(
    private _calendarEmitter: CalendarEmitter,
    private _checkOutEmitter: CheckoutEmitter,
    private _datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.restartCheckValues();
    this.startDatePickingSubscription();
  }

  startDatePickingSubscription(): void {
    this.datePickSubscription
      = this._calendarEmitter.datePicked$()
        .subscribe((datePicked: { date: Date, check: Check, days?: number }) => {
          if (datePicked.check === Check.In) {
            this.restartCheckValues();
            if (this.days >= 0) {
              this._calendarEmitter.uncheck(
                true, datePicked.date
              );
              this.days = 0;
            }
            this.CheckIn = this._datePipe.transform(datePicked.date.toLocaleDateString(), 'longDate');
          } else {
            this.CheckOut = this._datePipe.transform(datePicked.date.toLocaleDateString(), 'longDate');
            if (datePicked.days > 0) {
              this.days = datePicked.days;
              this._checkOutEmitter.checkoutPicked(this.days);
              /*if (this.days > 0) {
                this._checkOutEmitter.checkoutPicked(this.days);
              } else {
                this.days = datePicked.days;
              }*/
            } else {
              this.restartCheckValues();
              this.days = undefined;
            }
          }
        });
  }

  restartCheckValues(): void {
    this.CheckIn = 'Choose a date';
    this.CheckOut = 'Choose a date';
  }

  onClick(): void {
    this._checkOutEmitter.checkoutPicked(this.days);
  }

  ngOnDestroy() {
    if (this.datePickSubscription) {
      this.datePickSubscription.unsubscribe();
    }
  }

}
