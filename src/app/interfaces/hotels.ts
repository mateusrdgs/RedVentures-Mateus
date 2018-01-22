import { Observable } from 'rxjs/Observable';
import { Hotel } from './../models/hotel';

export interface IHotels {
  getHotels(): Observable<Hotel[]>;
}
