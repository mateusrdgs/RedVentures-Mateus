import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.styl']
})
export class FilterComponent implements OnInit {

  @Input() min: number;
  @Input() max: number;
  @Output() rangeEmitter: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() starsEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onRangeEmitted(event: number[]): void {
    this.rangeEmitter.emit(event);
  }

  onStarsEmitted(event: number): void {
    this.starsEmitter.emit(event);
  }

}
