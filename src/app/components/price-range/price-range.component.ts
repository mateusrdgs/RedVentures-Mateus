import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { PriceRangeDirective } from './../../directives/price-range.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.styl']
})
export class PriceRangeComponent implements OnInit, AfterViewInit {

  @ViewChildren(PriceRangeDirective) ranges: QueryList<PriceRangeDirective>;
  @Input() min: number;
  @Input() max: number;

  public minValue = this.max;
  public maxValue = this.min;
  private _minRangeSubscription: Subscription;
  private _maxRangeSubscription: Subscription;

  constructor(

  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.startSubscriptions();
  }

  startSubscriptions(): void {
    this._minRangeSubscription
      = Observable.fromEvent(this.ranges.first._elementRef.nativeElement, 'change')
      .subscribe((event: Event) => {
        const { valueAsNumber } = event.target as HTMLInputElement;
        console.log(valueAsNumber);
      });
    this._maxRangeSubscription
      = Observable.fromEvent(this.ranges.last._elementRef.nativeElement, 'change')
      .subscribe((event: Event) => {
        const { valueAsNumber } = event.target as HTMLInputElement;
        console.log(valueAsNumber);
      });
  }
}
