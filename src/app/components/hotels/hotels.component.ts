import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Hotel } from './../../models/hotel';

import { hotelAnimation } from './../../animations/hotel.animation';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.styl'],
  animations: [ hotelAnimation ]
})
export class HotelsComponent implements OnInit, OnDestroy {

  @Input() hotels: Hotel[];

  public state: string;

  constructor() { }

  ngOnInit() {
    this.state = 'entered';
  }

  ngOnDestroy() {
    this.state = '';
  }

}
