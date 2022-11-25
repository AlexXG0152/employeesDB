import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmpl } from 'src/app/interfaces/empl';
import { DataService } from 'src/app/services/users.service';

@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.scss']
})
export class EmployeePersonalDataComponent implements OnInit {
  userData: IEmpl[] = [];
  id?: string;

  constructor(private route: ActivatedRoute, private DataService: DataService, private router: Router) {
    this.route.params.subscribe(() => {
      console.log(this.router.url);

      this.id = this.router.url.split('/')[2];
      console.log('this.id', this.id);

      try {
        if (this.id) {
          this.DataService.getUser(this.id).subscribe((user) => {
            this.userData.push(user);
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
    console.log("userData", this.userData);

  }

  ngOnInit(): void {}
}
