import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { TooltipPosition } from '@angular/material/tooltip';
import moment from 'moment';
import { FormControl } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM.YYYY',
  },
  display: {
    dateInput: 'MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-employee-work-schedule',
  templateUrl: './employee-work-schedule.component.html',
  styleUrls: ['./employee-work-schedule.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmployeeWorkScheduleComponent implements OnInit {
  data: any;
  year = new Date().getFullYear();
  month = 0;
  hours = 0;
  date = new FormControl(moment());
  monthName = new Date(this.year, this.month - 1, 1).toLocaleString('default', {
    month: 'long',
  });
  dayNames = ['R', 'W', 'W', 'W', 'W', 'W', 'R'];
  statistics: any = {};
  tooltips?: any;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position1 = new FormControl(this.positionOptions[1]);
  position2 = new FormControl(this.positionOptions[0]);

  ngOnInit(): void {
    this.createDateArray();
    this.data = this.getDaysInMonth(this.year, this.month);
    this.statistics = this.calcHours();
    this.tooltips = this.getToolTip(this.data);
  }

  calcHours() {
    this.statistics = {};
    this.data.map((data: string[]) => {
      if (data[4] === 'D' || data[4] === 'N') {
        this.statistics['hours'] = this.statistics['hours'] + 11.25 || 11.25;
        this.statistics['workdays'] = this.statistics['workdays'] + 1 || 1;
      } else if (data[4] === 'R') {
        this.statistics['weekdays'] = this.statistics['weekdays'] + 1 || 1;
      }
    });
    return this.statistics;
  }

  valueChanged() {
    this.createDateArray();
    this.data = this.getDaysInMonth(this.year, this.month);
    this.statistics = this.calcHours();
    this.tooltips = this.getToolTip(this.data);
  }

  createDateArray() {
    this.year = this.date.value!.toArray()[0];
    this.month = this.date.value!.toArray()[1];
    this.monthName = new Date(this.year, this.month, 1).toLocaleString(
      'default',
      { month: 'long' }
    );
  }

  getDaysInMonth(year: number, month: number) {
    let date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push([
        new Date(date),
        new Date(date).toLocaleDateString(),
        this.dayNames[new Date(date).getDay()],
        Math.ceil(
          (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
            86400000
        ) + 1,
        this.graf16sm1[
          Math.ceil(
            (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) /
              86400000
          )
        ],
      ]);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();

    this.createDateArray();
    this.data = this.getDaysInMonth(this.year, this.month);
    this.statistics = this.calcHours();
    this.tooltips = this.getToolTip(this.data);
  }

  graf16sm1 = 'DDNNRRRR'.repeat(46).split('');
  graf16sm2 = 'NNRRRRDD'.repeat(46).split('');
  graf16sm3 = 'RRDDNNRR'.repeat(46).split('');
  graf16sm4 = 'RRRRDDNN'.repeat(46).split('');

  getToolTip(source: any) {
    let tooltip: any[] = [];
    source.forEach((element: any[]) => {
      if (element[4] === 'D') {
        tooltip.push(`${element[1]}, 08:00 - 20:00`);
      } else if (element[4] === 'N') {
        tooltip.push(`${element[1]}, 20:00 - 08:00`);
      } else {
        tooltip.push(`${element[1]}`);
      }
    });
    return tooltip;
  }
}

  // dayNames = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'];
  // names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  // letters = ['W', 'C', 'T', 'J', 'Q', 'E', 'R', 'Y', 'U', 'Z', 'X', 'G', 'I'];
  // randomSymbol() {
  //   return this.letters[Math.floor(Math.random() * this.letters.length)];
  // }

// function getDaysInMonth(month, year) {
//   let date = new Date(year, month-1, 1);
//   const days = [];
//   let today = new Date();
//   while (date.getMonth() === month-1) {
//     days.push([
//       new Date(date),
//       new Date(date).toLocaleDateString(),
//       Math.ceil((date - new Date(today.getFullYear(),0,1)) / 86400000)+1,
//       graf16sm1[Math.ceil((date - new Date(today.getFullYear(),0,1)) / 86400000)]
//     ]);
//     date.setDate(date.getDate() + 1);
//   }
//   return days;
// }

// const graf16sm1 = 'DDNNRRRR'.repeat(46).split('')
// const graf16sm2 = 'NNRRRRDD'.repeat(46).split('')
// const graf16sm3 = 'RRDDNNRR'.repeat(46).split('')
// const graf16sm4 = 'RRRRDDNN'.repeat(46).split('')

// console.log(graf16sm1)

// const fullY = {}
// const year = 2022

// for (let i=1; i<13; i++) {
//   fullY[i] = getDaysInMonth(i, year)
// }

// console.log(fullY)
