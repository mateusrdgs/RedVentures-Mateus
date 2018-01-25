import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.styl']
})
export class ProgressBarComponent implements OnInit {

  public percentage: number;
  public _value: number;

  @Input() max: number;
  @Input() set value(value: number) {
    this.percentage = Math.floor(value * 100 / this.max);
    this._value = value;
  }

  constructor() { }

  ngOnInit() {

  }

}
