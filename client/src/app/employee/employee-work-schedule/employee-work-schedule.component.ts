import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-work-schedule',
  templateUrl: './employee-work-schedule.component.html',
  styleUrls: ['./employee-work-schedule.component.scss'],
})
export class EmployeeWorkScheduleComponent {
  month = new Date().toLocaleString('default', { month: 'long' });
  year = new Date().getFullYear();
  letters = ['W', 'C', 'T', 'J', 'Q', 'E', 'R', 'Y', 'U', 'Z', 'X', 'G', 'I'];

  // wm = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '', 10:'' ,
  //   11: '', 12: '', 13: '', 14: '', 15: '', 16: '', 17: '', 18: '', 19: '', 20: '',
  //   21: '', 22: '', 23: '', 24: '', 25: '', 26: '', 27: '', 28: '', 29: '', 30: '', 31: '' };

  randomSymbol() {
    return this.letters[Math.floor(Math.random() * this.letters.length)];
  }
}
