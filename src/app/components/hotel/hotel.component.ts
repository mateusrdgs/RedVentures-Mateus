import { Component, Input, OnInit } from '@angular/core';

import { Hotel } from './../../models/hotel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.styl']
})
export class HotelComponent implements OnInit {

  @Input() hotel: Hotel;

  constructor() { }

  ngOnInit() {
  }

}
