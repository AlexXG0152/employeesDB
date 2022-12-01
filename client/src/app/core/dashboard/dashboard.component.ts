import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private ReportService: ReportService) {}

  async ngOnInit(): Promise<void> {
    await this.getTodaysBirthDays();
  }
  todaysBirthDays: any = [];

  async getTodaysBirthDays(): Promise<void> {
    const dateToday = new Date().toLocaleDateString().slice(0, 6);
    this.ReportService.getTodayBirthdays(dateToday).subscribe((data) => {
      this.todaysBirthDays = data;
      this.todaysBirthDays.forEach((element: any) => {
        element.age = this.getAge(element.birthDate);
      });
    });
  }

  getAge(birthDate: string) {
    const year = birthDate.slice(6, 10);
    const dateToday = new Date().toLocaleDateString().slice(6, 10);
    return Number(dateToday) - Number(year);
  }
}
