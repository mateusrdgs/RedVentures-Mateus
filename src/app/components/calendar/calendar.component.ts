import { Component, OnInit } from '@angular/core';

import { CalendarEmitter } from './../../emitters/calendar.emitter';

import { Check } from './../../enumerators/check.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.styl']
})
export class CalendarComponent implements OnInit {

  public matrix = new Array(7);
  public currentDate = new Date(
    Date.now()
  );
  public monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public daysOfMonth = [
    31, this.isLeapYear(this.currentDate.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  public daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  private checkInDate: Date;
  private checkOutDate: Date;
  private acc = 1;

  constructor(
    private _calendarEmitter: CalendarEmitter
  ) { }

  ngOnInit() {
    this.matrix = this.createCalendar(
      this.currentDate.getMonth(),
      new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      ).getDay()
    );
  }

  private createMatrix(rows: number): any[] {
    const matrix = new Array(rows);
    for (let column = 0; column < rows; column++) {
      matrix[column] = new Array(7);
    }
    return matrix;
  }

  private isLeapYear(year: number): boolean {
    return (
      (year % 400 === 0) ||
      (year % 4 === 0 && year % 100 !== 0)
    );
  }

  private createCalendar(month: number, firstDayOfMonth: number): any[] {
    let dayOfWeek = 0;
    let dayAcc = 0;
    const matrix = this.createMatrix(
      Math.ceil(
        this.daysOfMonth[this.currentDate.getMonth()] / 7
      )
    );
    for (let week = 0; week < matrix.length; week++) {
      for (let day = 0; day < 7; day++) {
        if (day === 0 && dayAcc === 0) { // to verify in which day of week the month starts
          while (dayOfWeek !== firstDayOfMonth) {
            dayOfWeek++;
            matrix[week][day] = month === 0 ? this.daysOfMonth[11] - day : this.daysOfMonth[month - 1] - day;
            if (dayOfWeek !== firstDayOfMonth) {
              day++;
            }
          }
        } else {
          if (dayAcc >= this.daysOfMonth[month]) {
            dayAcc = 0;
          }
          dayAcc++;
          matrix[week][day] = {
            day: dayAcc,
            date: new Date(
              this.currentDate.getFullYear(),
              this.currentDate.getMonth(),
              dayAcc
            ).toLocaleDateString(),
            currentMonth: false
          };
        }
      }
    }
    return matrix;
  }

  public onDatePicked(event): void {
    const date = new Date(event);
    if (this.acc % 2 !== 0) {
      this.checkInDate = date;
      this._calendarEmitter.datePicked(date, Check.In);
    } else {
      this.checkOutDate = date;
      this._calendarEmitter.datePicked(date, Check.Out);
    }
    this.acc += 1;
    /*if (!this.checkInDate && !this.checkOutDate) {
      this.checkInDate = date;
      this.checkOutDate = date;
      this._calendarEmitter.datePicked(date, Check.In);
    } else if (date < this.checkOutDate) {
      this.checkInDate = date;
    } else {
      this.checkOutDate = date;
      this._calendarEmitter.datePicked(date, Check.Out);
    }*/
  }
}
