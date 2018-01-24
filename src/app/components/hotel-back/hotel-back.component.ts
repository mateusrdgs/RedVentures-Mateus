import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { PriceHistory } from './../../models/price-history';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-back',
  templateUrl: './hotel-back.component.html',
  styleUrls: ['./hotel-back.component.styl']
})
export class HotelBackComponent implements OnInit {

  @Input() priceHistory: PriceHistory[];
  @Output() flip: EventEmitter<boolean> = new EventEmitter<boolean>();

  public title = 'Price history for 2017';

  constructor() { }

  ngOnInit() {
  }

  onFlip(): void {
    this.flip.emit(false);
  }

}
