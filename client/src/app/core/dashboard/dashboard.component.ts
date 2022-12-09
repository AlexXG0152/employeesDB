import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/interfaces/employees';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private ReportService: ReportService) {}

  dash?: any;
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
      this.divideByMonth(this.hiredInThisYear,'employmentDate', this.yearHired);
      this.divideByMonth(this.firedInThisYear, 'dismissalDate', this.yearFired);

      // this.ReportService.getDashboardData().subscribe((data) => {
      //   this.dash = data;
      //   Array.from(this.dash).forEach((record: any) => {
      //     if (record.b) {
      //       this.todaysBirthDays = record['b'];
      //     } else if (record.h) {
      //       this.hiredInThisYear = record['h'];
      //       this.divideByMonth(
      //         this.hiredInThisYear,
      //         'dismissalDate',
      //         this.yearHired
      //       );
      //     } else {
      //       this.firedInThisYear = record['f'];
      //       this.divideByMonth(
      //         this.firedInThisYear,
      //         'dismissalDate',
      //         this.yearFired
      //       );
      //     }
      //   });
      // });
    }
  }

  yearToday = new Date().toLocaleDateString().slice(6, 10);

  todaysBirthDays: Employee[] = [];
  firedInThisYear: Employee[] = [];
  hiredInThisYear: Employee[] = [];
  yearHired: any = {
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
  yearFired?: Object = { ...this.yearHired };
  months = [
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
    this.ReportService.getTodayBirthdays(dateToday).subscribe((data) => {
      this.todaysBirthDays = data;
      // this.ReportService.passDashboardData('b', data);
      window.localStorage.setItem('b', JSON.stringify(this.todaysBirthDays));
      this.todaysBirthDays.forEach((element: any) => {
        element.age = this.getAge(element.birthDate);
      });
    });
  }

  getHiredInThisYear(): void {
    this.ReportService.getHiredInThisYear(this.yearToday).subscribe((data) => {
      this.hiredInThisYear = data;
      // this.ReportService.passDashboardData('h', data);
      window.localStorage.setItem('h', JSON.stringify(this.hiredInThisYear));
      this.divideByMonth(
        this.hiredInThisYear,
        'employmentDate',
        this.yearHired
      );
    });
  }
  getFiredInThisYear(): void {
    this.ReportService.getFiredInThisYear(this.yearToday).subscribe((data) => {
      this.firedInThisYear = data;
      // this.ReportService.passDashboardData('f', data);
      window.localStorage.setItem('f', JSON.stringify(this.firedInThisYear));
      this.divideByMonth(this.firedInThisYear, 'dismissalDate', this.yearFired);
    });
  }

  getAge(birthDate: string) {
    const year = birthDate.slice(6, 10);
    const dateToday = new Date().toLocaleDateString().slice(6, 10);
    return Number(dateToday) - Number(year);
  }

  divideByMonth(array: any[], type: string, output: any) {
    array.forEach((element: any) => {
      const month = element[type].slice(3, 5);
      output[month] = Number(output[month] + 1);
    });
  }
}
