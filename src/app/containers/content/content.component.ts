import { Component, OnInit } from '@angular/core';

import { HotelsService } from './../../services/hotels.service';
import { Hotel } from '../../models/hotel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.styl']
})
export class ContentComponent implements OnInit {

  constructor(
    private _hotelsService: HotelsService
  ) { }

  ngOnInit() {

  }

}
