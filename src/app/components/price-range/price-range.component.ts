import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/fromEvent';

import { withLatestFrom } from 'rxjs/operator/withLatestFrom';

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
    this.slided1 = value;
  }
  @Input() set max(value: number) {
    this.maxRange = value;
    this.slided2 = value;
  }

  private _sliderSubscription: Subscription;
  private _slider1Observable: Observable<PriceRangeDirective>;
  private _slider2Observable: Observable<PriceRangeDirective>;
  private minRange: number;
  private maxRange: number;

  public slided1: number;
  public slided2: number;

  constructor(

  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.startSubscriptions();
    this.slided1 = this.min;
    this.slided2 = this.max;
  }

  startSubscriptions(): void {
    this._slider1Observable =
      Observable.fromEvent(this.ranges.first._elementRef.nativeElement, 'change');
    this._slider2Observable =
      Observable.fromEvent(this.ranges.last._elementRef.nativeElement, 'change');
    this._sliderSubscription =
      Observable
        .merge(this._slider1Observable, this._slider2Observable)
        .map((event: any) => {
          const { valueAsNumber } = event.target;
          return {
            valueAsNumber,
            target: event.target === this.ranges.first._elementRef.nativeElement ? 'slide1' : 'slide2'
          };
        })
        .subscribe((value: any) => {
          const { target, valueAsNumber } = value;
          if (target === 'slide1') {
            if (valueAsNumber > this.slided2) {
              this.slided2 = this.slided1;
              this.slided1 = valueAsNumber;
            } else {
              this.slided1 = valueAsNumber;
            }
          } else {
            if (valueAsNumber < this.slided1) {
              this.slided2 = this.slided1;
              this.slided1 = valueAsNumber;
            } else {
              this.slided2 = valueAsNumber;
            }
          }
          /*const [ slide1, slide2 ] = valueAsArray;
          if (slide1 > slide2) {
            this.slided2 = slide1;
            this.slided1 = slide2;
          } else {
            this.slided1 = slide1;
            this.slided2 = slide2;
          }*/
        });
  }
}
