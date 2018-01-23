import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HotelsService } from './../../services/hotels.service';
import { Hotel } from '../../models/hotel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-container',
  templateUrl: './results-container.component.html',
  styleUrls: ['./results-container.component.styl']
})
export class ResultsContainerComponent implements OnInit {

  public hotels$: Observable<Hotel[]>;
  public hotels: Hotel[];
  public prices: number[];
  public stars: number;
  public min;
  public max;

  constructor(
    private _hotelsService: HotelsService
  ) { }

  ngOnInit() {
    this.hotels$ = this._hotelsService.getHotels();
    this.hotels$.subscribe(hotels => {
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

}
