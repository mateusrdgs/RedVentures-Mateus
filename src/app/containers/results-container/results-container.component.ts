import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/isEmpty';

import { HotelsService } from './../../services/hotels.service';

import { CheckoutEmitter } from './../../emitters/checkout.emitter';

import { Hotel } from '../../models/hotel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.styl']
})
export class ResultsContainerComponent implements OnInit, OnDestroy {

  private _hotelsSubscription: Subscription;
  private _checkoutSubscription: Subscription;
  // public hotels$: Observable<Hotel[]>;
  public hotels: Hotel[];
  public prices: number[];
  public stars: number;
  public days: number;
  public min;
  public max;

  constructor(
    private _hotelsService: HotelsService,
    private _checkoutEmitter: CheckoutEmitter
  ) { }

  ngOnInit() {
    this.startCheckoutSubscription();
  }

  startCheckoutSubscription(): void {
    this._checkoutSubscription =
      this._checkoutEmitter
        .checkoutPicked$().subscribe((days: number) => {
          if (days >= 0) {
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

  onRangeEmitted(event: number[]): void {
    const [ minRange, maxRange ] = event;
    this.prices = [ minRange, maxRange ];
  }

  onStarsEmitted(event: number): void {
    this.stars = event;
  }

  ngOnDestroy() {
    if (this._checkoutSubscription) {
      this._checkoutSubscription.unsubscribe();
    }
  }

}
