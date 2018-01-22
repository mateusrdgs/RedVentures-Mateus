export class PriceHistory {
  private _month: string;
  private _value: number;

  constructor(
    month: string, value: number
  ) {
    this.Month = month;
    this.Value = value;
  }

  get Month(): string {
    return this._month;
  }

  set Month(month: string) {
    this._month = month;
  }

  get Value(): number {
    return this._value;
  }

  set Value(value: number) {
    this._value = value;
  }

}
