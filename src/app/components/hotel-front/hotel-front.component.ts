import { PriceHistory } from './../../models/price-history';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-front',
  templateUrl: './hotel-front.component.html',
  styleUrls: ['./hotel-front.component.styl']
})
export class HotelFrontComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Input() image: string;
  @Input() priceHistory: PriceHistory[];

  constructor() { }

  ngOnInit() {
  }

}
