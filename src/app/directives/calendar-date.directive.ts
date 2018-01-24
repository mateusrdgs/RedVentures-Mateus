import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[calendarDate]'
})
export class CalendarDateDirective {

  @Output() datePicked: EventEmitter<Number> = new EventEmitter<Number>();

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) {

  }

  @HostListener('click', ['$event'])
  public onClick(event): void {
    const currentDate = new Date(
      this._elementRef.nativeElement.getAttribute('data-date')
    ).setHours(0, 0, 0, 0);
    const pickedDate = new Date(
      this._elementRef.nativeElement.getAttribute('data-date')
    ).setHours(0, 0, 0, 0);
    const isBiggerOrEqual = pickedDate >= currentDate;
    if (isBiggerOrEqual) {
      this._renderer2.addClass(
        this._elementRef.nativeElement,
        'picked'
      );
      this.datePicked.emit(pickedDate);
    }
  }

}
