import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[calendarDate]'
})
export class CalendarDateDirective {

  @Output() datePicked: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) {

  }

  @HostListener('click', ['$event'])
  public onClick(event): void {
    const currentDate = new Date(
      2017, 7, 1
    ).setHours(0, 0, 0, 0);
    const pickedDate = new Date(
      this._elementRef.nativeElement.getAttribute('data-date')
    ).setHours(0, 0, 0, 0);
    const isBiggerOrEqual = pickedDate >= currentDate;
    if (isBiggerOrEqual) {
      const index = parseInt(
        this._elementRef.nativeElement.getAttribute('data-index'),
        10
      );
      this._renderer2.addClass(
        this._elementRef.nativeElement,
        'picked'
      );
      this.datePicked.emit({
        pickedDate,
        index
      });
    }
  }

  public addClass(index: number, className: string): void {
    const _index = parseInt(
      this._elementRef.nativeElement.getAttribute('data-index'),
      10
    );
    if (index === _index) {
      this._renderer2.addClass(this._elementRef.nativeElement, className);
    }
  }

  public removeClass(date: Date, className: string): void {
    const _date = new Date(
      this._elementRef.nativeElement.getAttribute('data-date')
    ).setHours(0, 0, 0, 0);
    if ((date.setHours(0, 0, 0, 0)) !== _date) {
      this._renderer2.removeClass(this._elementRef.nativeElement, className);
    }
  }

}
