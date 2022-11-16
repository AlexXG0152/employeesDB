import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEmpl } from 'src/app/interfaces/empl';
import empls from '../../../assets/empls.json';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit {
  dataBase: any = [];
  id: number | undefined;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      try {
        if (params["id"]) {
          this.dataBase = empls.filter((x: IEmpl) => x.id === Number(params["id"]))
          // this.doSearch(params["id"]);
        }
      } catch (error) {
        console.error(error)
      }
    });
  }

  // doSearch(userID: string){
  //   return this.dataBase.filter((x: any) => x.id === Number(userID))
  // }

  ngOnInit(): void {
  }
}
