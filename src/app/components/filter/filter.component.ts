import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.styl']
})
export class FilterComponent implements OnInit {

  min = 0;
  max = 100;

  constructor() { }

  ngOnInit() {
  }

}
