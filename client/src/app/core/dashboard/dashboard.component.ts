import { Component, OnInit } from '@angular/core';
import { IFiredInYear, IHiredInYear, ITodayBirthdays } from '../../interfaces/dashboard';
import { ReportService } from '../../services/report.service';

type Year = {
  [key: string]: null;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    if (
      window.localStorage.getItem('todayDayForDashboard') !==
      new Date().toLocaleDateString().slice(0, 2)
    ) {
      this.getTodaysBirthDays();
      this.getHiredInThisYear();
      this.getFiredInThisYear();
      window.localStorage.setItem(
        'todayDayForDashboard',
        new Date().toLocaleDateString().slice(0, 2)
      );
    } else {
      this.todaysBirthDays = JSON.parse(window.localStorage.getItem('b')!);
      this.hiredInThisYear = JSON.parse(window.localStorage.getItem('h')!);
      this.firedInThisYear = JSON.parse(window.localStorage.getItem('f')!);
      this.divideByMonth(
        this.hiredInThisYear,
        'employmentDate',
        this.yearHired
      );
      this.divideByMonth(this.firedInThisYear, 'dismissalDate', this.yearFired);
    }
  }

  yearToday = new Date().toLocaleDateString().slice(6, 10);

  todaysBirthDays: ITodayBirthdays[] = [];
  hiredInThisYear: IHiredInYear[] = [];
  firedInThisYear: IFiredInYear[] = [];

  year: Year = {
    '01': null,
    '02': null,
    '03': null,
    '04': null,
    '05': null,
    '06': null,
    '07': null,
    '08': null,
    '09': null,
    '10': null,
    '11': null,
    '12': null,
  };
  yearHired: { [key: string]: null } = { ...this.year };
  yearFired: { [key: string]: null } = { ...this.year };
  monthsForTemplate: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  getTodaysBirthDays(): void {
    const dateToday = new Date().toLocaleDateString().slice(0, 6);
    this.reportService.getTodayBirthdays(dateToday).subscribe((data: ITodayBirthdays[]) => {
      this.todaysBirthDays = data;
      window.localStorage.setItem('b', JSON.stringify(this.todaysBirthDays));
      this.todaysBirthDays.forEach((element) => {
        element.age = this.getAge(element.birthDate);
      });
    });
  }

  getHiredInThisYear(): void {
    this.reportService.getHiredInThisYear(this.yearToday).subscribe((data) => {
      this.hiredInThisYear = data;
      window.localStorage.setItem('h', JSON.stringify(this.hiredInThisYear));
      this.divideByMonth(
        this.hiredInThisYear,
        'employmentDate',
        this.yearHired
      );
    });
  }
  getFiredInThisYear(): void {
    this.reportService.getFiredInThisYear(this.yearToday).subscribe((data) => {
      this.firedInThisYear = data;
      window.localStorage.setItem('f', JSON.stringify(this.firedInThisYear));
      this.divideByMonth(this.firedInThisYear, 'dismissalDate', this.yearFired);
    });
  }

  getAge(birthDate: string) {
    const year = birthDate.slice(6, 10);
    const dateToday = new Date().toLocaleDateString().slice(6, 10);
    return Number(dateToday) - Number(year);
  }

  divideByMonth(
    array: IHiredInYear[] | IFiredInYear[],
    type: string,
    output: { [key: string]: number | null }
  ) {
    array.forEach((element: IHiredInYear | IFiredInYear) => {
      let month = element[type as keyof typeof element];
      month = (month as string).slice(3, 5);
      output[month] = Number(output[month]! + 1);
    });
  }
}
