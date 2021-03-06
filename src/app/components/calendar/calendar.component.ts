import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { CalendarDateDirective } from './../../directives/calendar-date.directive';

import { CalendarEmitter } from './../../emitters/calendar.emitter';

import { Check } from './../../enumerators/check.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.styl']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChildren(CalendarDateDirective) dates: QueryList<CalendarDateDirective>;

  private uncheckSubscription: Subscription;
  private checkInDate: Date;
  private checkOutDate: Date;
  private acc = 1;
  public matrix = new Array(7);
  public currentDate = new Date(2017, 7, 1);
  public monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public currentMonthName = this.monthsOfYear[this.currentDate.getMonth()];
  public currentYear = this.currentDate.getFullYear();
  public daysOfMonth = [
    31, this.isLeapYear(this.currentDate.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
  ];
  public daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  private rangeStartIndex = 0;

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

  ngAfterViewInit() {
    this.startUncheckSubscription();
  }

  startUncheckSubscription(): void {
    this.uncheckSubscription =
      this._calendarEmitter.uncheck$()
        .subscribe((uncheck: { uncheck: boolean, date: Date }) => {
          if (uncheck.uncheck) {
            if (uncheck.date) {
              this.dates
              .forEach((date: CalendarDateDirective) => date.removeClasses(['picked', 'range', 'range-start', 'range-end'], uncheck.date));
            } else {
              this.dates
              .forEach((date: CalendarDateDirective) => date.removeClasses(['picked']));
            }
          }
        });
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
    let currentMonth = true;
    let index = 0;
    const matrix = this.createMatrix(
      Math.ceil(
        this.daysOfMonth[this.currentDate.getMonth()] / 7
      )
    );
    for (let week = 0; week < matrix.length; week++) {
      for (let day = 0; day < 7; day++) {
        if (day === 0 && dayAcc === 0) { // to verify in which day of week the month starts
          index = firstDayOfMonth - 1;
          while (dayOfWeek !== firstDayOfMonth) {
            const year = month === 0 ? this.currentDate.getFullYear() - 1 : this.currentDate.getFullYear();
            matrix[week][(firstDayOfMonth - 1) - day] = {
              day: month === 0 ? this.daysOfMonth[11] : this.daysOfMonth[month - 1] - day,
              date: new Date(
                year,
                month - 1,
                this.daysOfMonth[month] - day
              ),
              currentMonth: false,
              index
            };
            dayOfWeek++;
            if (dayOfWeek !== firstDayOfMonth) {
              day += 1;
            }
            index -= 1;
          }
        } else {
          if (index <= 0) {
            index = firstDayOfMonth;
          }
          if (dayAcc >= this.daysOfMonth[month]) {
            dayAcc = 0;
            currentMonth = false;
          }
          dayAcc++;
          matrix[week][day] = {
            day: dayAcc,
            date: new Date(
              this.currentDate.getFullYear(),
              currentMonth ? this.currentDate.getMonth() : this.currentDate.getMonth() + 1,
              dayAcc
            ).toLocaleDateString(),
            currentMonth,
            index
          };
          index += 1;
        }
      }
    }
    return matrix;
  }

  public onDatePicked(event): void {
    const { pickedDate, index } = event;
    const date = new Date(pickedDate);
    if (this.acc % 2 !== 0) {
      this.checkInDate = date;
      this._calendarEmitter.datePicked(date, Check.In);
      this.rangeStartIndex = index;
    } else {
      this.checkOutDate = date;
      const days  = this.calculateDays();
      this._calendarEmitter.datePicked(date, Check.Out, days);
      this.paintRange(index);
    }
    this.acc += 1;
  }

  private paintRange(endIndex: number) {
    let index = this.rangeStartIndex;
    for (index; index <= endIndex; index++) {
      this.dates.forEach((date: CalendarDateDirective, _index: number) => {
        if (_index === this.rangeStartIndex) {
          date.addClass(index, 'range-start');
        }
        if (_index === endIndex) {
          date.addClass(index, 'range-end');
        }
        date.addClass(index, 'range');
      });
    }
  }

  private calculateDays(): number {
    const millisecondsDiff = this.checkOutDate.getTime() - this.checkInDate.getTime();
    const millisecondsInADay = 1000 * 3600 * 24; // 1 millisecond * 3600 seconds (60 minutes === 1 hour) * 24 hours
    const days = Math.floor(millisecondsDiff / millisecondsInADay);
    return days ? days : days + 1;
  }
}
