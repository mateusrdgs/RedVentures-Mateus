import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hotel-front',
  templateUrl: './hotel-front.component.html',
  styleUrls: ['./hotel-front.component.styl']
})
export class HotelFrontComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;
  @Output() flip: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onFlip(): void {
    this.flip.emit(true);
  }

}
