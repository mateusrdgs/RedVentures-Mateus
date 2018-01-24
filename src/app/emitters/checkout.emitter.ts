import { EventEmitter, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CheckoutEmitter {

  private _checkoutEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {

  }

  public checkoutPicked(days: number) {
    this._checkoutEmitter.emit(days);
  }

  public checkoutPicked$(): Observable<number> {
    return this._checkoutEmitter.asObservable();
  }

}
