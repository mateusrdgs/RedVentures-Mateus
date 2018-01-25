import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { PriceHistory } from './../../models/price-history';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-back',
  templateUrl: './hotel-back.component.html',
  styleUrls: ['./hotel-back.component.styl']
})
export class HotelBackComponent implements OnInit {

  @Input() set priceHistory(priceHistory: PriceHistory[]) {
    this.max = Math.max(...priceHistory.map((price: PriceHistory) => price.Value));
    this._priceHistory = priceHistory;
  }
  get priceHistory(): PriceHistory[] {
    return this._priceHistory;
  }

  @Output() flip: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'Price history for 2017';
  private _priceHistory: PriceHistory[];
  public max: number;

  constructor() { }

  ngOnInit() {
  }

  onFlip(): void {
    this.flip.emit(false);
  }

}
