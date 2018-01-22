import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.styl']
})
export class StarComponent implements OnInit {

  @Input() index: number;
  @Input() filled: boolean;
  @Output() starFilter: EventEmitter<number> = new EventEmitter<number>();
  @HostListener('click', ['$event'])
  onClick(event) {
    this.starFilter.emit(this.index);
  }

  constructor() { }

  ngOnInit() {

  }

}
