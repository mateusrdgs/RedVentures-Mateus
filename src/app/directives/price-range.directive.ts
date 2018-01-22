import { Directive, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[priceRange]'
})
export class PriceRangeDirective {

  constructor(
    public _elementRef: ElementRef
  ) { }

}
