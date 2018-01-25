import { PriceHistory } from './../models/price-history';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IHotels } from './../interfaces/hotels';

import { Hotel } from './../models/hotel';

@Injectable()
export class HotelsService implements IHotels {

  private _url = 'https://www.raphaelfabeni.com.br/rv/hotels.json';

  constructor(
    private _http: HttpClient
  ) { }

  public getHotels(): any {
    return (
      this._http
        .get(this._url)
        .map((response: Response) => this.iterateOverHotels(response['hotels']))
        .catch(this.handleError)
    );
  }

  private iterateOverHotels(hotels: any[]): Hotel[] {
    if (Array.isArray(hotels)) {
      return hotels.map(hotel => {
        const { name, description, image, rate, price, price_history } = hotel;
        const priceHistory = price_history.map((_price) => {
          const { month, value } = _price;
          return new PriceHistory(month, value);
        });
        return new Hotel(name, description, image, rate, price, priceHistory );
      });
    }
  }

  private handleError(error: Error): Observable<Error> {
    return Observable.throw(error['_body'] || error.message || error);
  }

}
