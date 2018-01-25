import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/isEmpty';

import { HotelsService } from './../../services/hotels.service';

import { CalendarEmitter } from './../../emitters/calendar.emitter';
import { CheckoutEmitter } from './../../emitters/checkout.emitter';

import { Hotel } from '../../models/hotel';
import { Check } from './../../enumerators/check.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.styl']
})
export class ResultsContainerComponent implements OnInit, OnDestroy {

  private _hotelsSubscription: Subscription;
  private _calendarSubscription: Subscription;
  private _checkoutSubscription: Subscription;
  public hotels: Hotel[];
  public prices: number[];
  public stars: number;
  public days: number;
  public min;
  public max;
  public checkInDate: string;
  public checkOutDate: string;

  constructor(
    private _hotelsService: HotelsService,
    private _calendarEmitter: CalendarEmitter,
    private _checkoutEmitter: CheckoutEmitter,
    private _datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.restartDateValues();
    this.startCalendarEmitter();
    this.startCheckoutEmitter();
  }

  startCalendarEmitter(): void {
    this._calendarSubscription =
      this._calendarEmitter
        .datePicked$()
        .subscribe((datePicked: { date: Date, check: Check, days?: number}) => {
          if (datePicked.check === Check.In) {
            this.restartDateValues();
            this.checkInDate = this._datePipe.transform(datePicked.date.toLocaleDateString(), 'longDate');
          } else {
            /*
              If you're seeing this, yeah, I could just used the days property and make the request.
              But, I'm not doing this to follow the UI and let the user click the button.
            */
            this.checkOutDate = this._datePipe.transform(datePicked.date.toLocaleDateString(), 'longDate');
          }
        });
  }

  startCheckoutEmitter(): void {
    this._checkoutSubscription =
      this._checkoutEmitter.checkoutPicked$()
        .subscribe((days: number) => {
          if (days > 0) {
            this.days = days;
            if (!this._hotelsSubscription) {
              this.startHotelsSubscription();
            }
          }
        });
  }

  startHotelsSubscription(): void {
    this._hotelsSubscription =
      this._hotelsService.getHotels()
        .subscribe(hotels => {
          this.hotels = hotels;
          const prices = hotels.map(hotel => hotel.Price);
          this.prices = [
            Math.floor(Math.min(...prices)),
            Math.floor(Math.max(...prices))
          ];
          this.min = this.prices[0];
          this.max = this.prices[1];
        });
  }

  restartDateValues(): void {
    this.checkInDate = 'choose a date';
    this.checkOutDate = 'choose a date';
  }

  onRangeEmitted(event: number[]): void {
    const [ minRange, maxRange ] = event;
    this.prices = [ minRange, maxRange ];
  }

  onStarsEmitted(event: number): void {
    this.stars = event;
  }

  ngOnDestroy() {
    if (this._calendarSubscription) {
      this._calendarSubscription.unsubscribe();
    }
    if (this._checkoutSubscription) {
      this._checkoutSubscription.unsubscribe();
    }
    if (this._hotelsSubscription) {
      this._hotelsSubscription.unsubscribe();
    }
  }

}
