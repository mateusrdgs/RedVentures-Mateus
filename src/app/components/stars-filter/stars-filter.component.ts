import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stars-filter',
  templateUrl: './stars-filter.component.html',
  styleUrls: ['./stars-filter.component.styl']
})
export class StarsFilterComponent implements OnInit {

  public stars = [
    { filled: true },
    { filled: true },
    { filled: true },
    { filled: false },
    { filled: false },
  ]; // change this to a plain number

  constructor() { }

  ngOnInit() {

  }

  onStarFilter(event: number) {
    for (let index = 0; index < this.stars.length; index++) {
      if (index <= event) {
        this.stars[index].filled = true;
      } else {
        this.stars[index].filled = false;
      }
    }
  }

}
