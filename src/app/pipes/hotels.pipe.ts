import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hotel } from '../models/hotel';

@Pipe({
  name: 'hotels'
})
export class HotelsPipe implements PipeTransform {

  transform(hotels: Hotel[], prices: number[], stars: number): any {
    if (Array.isArray(prices) && prices.length) {
      if (Array.isArray(hotels)) {
        return hotels.filter((hotel: Hotel) => hotel.Price >= prices[0]).filter((hotel: Hotel) => hotel.Price <= prices[1])
          .filter((hotel: Hotel) => {
            return stars ? hotel.Rate === stars : hotel;
          });
      }
    } else {
      return hotels;
    }
  }

}
