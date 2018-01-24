import { PriceHistory } from './price-history';

export class Hotel {
  private _name: string;
  private _description: string;
  private _image: string;
  private _rate: number;
  private _price: number;
  private _priceHistory: PriceHistory[];
  private _totalPrice: number;

  constructor(...args: any[]) {
    this.Name = args[0];
    this.Description = args[1];
    this.Image = args[2];
    this.Rate = args[3];
    this.Price = args[4];
    this.PriceHistory = args[5];
    if (args.length > 6) {
      this.TotalPrice = args[6];
    }
  }

  get Name(): string {
    return this._name;
  }

  set Name(name: string) {
    this._name = name;
  }

  get Description(): string {
    return this._description;
  }

  set Description(description: string) {
    this._description = description;
  }

  get Image(): string {
    return this._image;
  }

  set Image(image: string) {
    this._image = image;
  }

  get Rate(): number {
    return this._rate;
  }

  set Rate(rate: number) {
    this._rate = rate;
  }

  get Price(): number {
    return this._price;
  }

  set Price(price: number) {
    this._price = price;
  }

  get PriceHistory(): PriceHistory[] {
    return this._priceHistory;
  }

  set PriceHistory(priceHistory: PriceHistory[]) {
    this._priceHistory = priceHistory;
  }

  get TotalPrice(): number {
    return this._totalPrice;
  }

  set TotalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }

}
