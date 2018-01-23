import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stars-filter',
  templateUrl: './stars-filter.component.html',
  styleUrls: ['./stars-filter.component.styl']
})
export class StarsFilterComponent implements OnInit {

  @Output() starsEmitter: EventEmitter<number> = new EventEmitter<any>();

  public stars: any = [
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
    this.stars = this.stars.map((star: any, index: number) => {
      return index <= event ? { filled: true } : { filled: false };
    });
    const stars = this.stars.filter(star => star.filled).length;
    this.starsEmitter.emit(stars);
  }

}
