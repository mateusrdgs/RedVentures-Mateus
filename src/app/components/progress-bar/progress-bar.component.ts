import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.styl']
})
export class ProgressBarComponent implements OnInit {

  private _value: number;

  @Input() set value(value: number) {
    this._value = this.map(value, 0, 1000, 0, 400);
  }

  get value(): number {
    return this._value;
  }

  constructor() { }

  ngOnInit() {
  }

  private map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

}
