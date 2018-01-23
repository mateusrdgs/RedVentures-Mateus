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
  public prices: number[];
  public min;
  public max;

  constructor(
    private _hotelsService: HotelsService
  ) { }

  ngOnInit() {
    this.hotels$ = this._hotelsService.getHotels();
    this.hotels$.subscribe(hotels => {
      const prices = hotels.map(hotel => hotel.Price);
      this.min = Math.floor(Math.min(...prices));
      this.max = Math.floor(Math.max(...prices));
    });
  }

}
