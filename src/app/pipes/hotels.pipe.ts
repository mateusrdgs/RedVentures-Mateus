import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hotel } from '../models/hotel';

@Pipe({
  name: 'hotels'
})
export class HotelsPipe implements PipeTransform {

  transform(hotels: Hotel[], prices: number[], stars: number, days: number): any {
    if (Array.isArray(prices) && prices.length) {
      if (Array.isArray(hotels)) {
        return hotels
          .map((hotel: Hotel) => {
            const _hotel = [
              ...Object.values(hotel),
              hotel.Price * days
            ];
            return new Hotel(..._hotel);
          })
          .filter((hotel: Hotel) => hotel.Price >= prices[0]).filter((hotel: Hotel) => hotel.Price <= prices[1])
          .filter((hotel: Hotel) => {
            return stars ? hotel.Rate === stars : hotel;
          });
      }
    } else {
      return hotels;
    }
  }

}
