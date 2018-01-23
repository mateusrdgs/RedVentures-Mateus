import { Component, Input, OnInit } from '@angular/core';

import { Hotel } from './../../models/hotel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.styl']
})
export class HotelsComponent implements OnInit {

  @Input() hotels: Hotel[];

  constructor() { }

  ngOnInit() {
  }

}
