import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/zip';
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
  @Input() set min(value: number) {
    this.minRange = value;
    this.slidedLeft = value;
  }
  @Input() set max(value: number) {
    this.maxRange = value;
    this.slidedRight = value;
  }

  @Output() rangeEmitter: EventEmitter<number[]> = new EventEmitter<number[]>();

  private _sliderSubscription: Subscription;
  private _slider1Observable: Observable<any>;
  private _slider2Observable: Observable<any>;
  public minRange: number;
  public maxRange: number;

  public slidedLeft: number;
  public slidedRight: number;

  constructor(

  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.startSubscriptions();
  }

  startSubscriptions(): void {
    this._slider1Observable =
      Observable.fromEvent(this.ranges.first._elementRef.nativeElement, 'change');
    this._slider2Observable =
      Observable.fromEvent(this.ranges.last._elementRef.nativeElement, 'change');
    this._sliderSubscription =
      this._slider1Observable
        .combineLatest(this._slider2Observable)
        .map((event: any) => {
          return {
            sliderRight: event[0].target.valueAsNumber,
            sliderLeft: event[1].target.valueAsNumber,
          };
        })
        .subscribe((event: any) => {
          const { sliderRight, sliderLeft } = event;
          if (sliderRight > sliderLeft) {
            this.slidedRight = sliderRight;
            this.slidedLeft = sliderLeft;
            this.rangeEmitter.emit([sliderLeft, sliderRight]);
          } else {
            this.slidedLeft = sliderRight;
            this.slidedRight = sliderLeft;
            this.rangeEmitter.emit([sliderRight, sliderLeft]);
          }
      });
  }
}
