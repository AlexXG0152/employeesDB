import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmpl } from 'src/app/interfaces/empl';
import empls from '../../../assets/empls.json';
import { DataService } from 'src/app/services/users.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit {
  userData: IEmpl[] = [];
  id?: number;

  constructor(private route: ActivatedRoute, private DataService: DataService) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      try {
        if (params['id']) {
          this.DataService.getUser(params['id']).subscribe((user) => {
            this.userData.push(user);
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {}
}
