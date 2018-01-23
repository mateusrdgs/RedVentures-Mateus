import { Component, Input, OnInit } from '@angular/core';

import { PriceHistory } from './../../models/price-history';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-back',
  templateUrl: './hotel-back.component.html',
  styleUrls: ['./hotel-back.component.styl']
})
export class HotelBackComponent implements OnInit {

  @Input() priceHistory: PriceHistory[];
  public title = 'Price history for 2017';

  constructor() { }

  ngOnInit() {
  }

}
