import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { EmployeePersonalDataService } from '../../services/employee-personal-data.service';

@Component({
  selector: 'app-employee-index-page',
  templateUrl: './employee-index-page.component.html',
  styleUrls: ['./employee-index-page.component.scss'],
})
export class EmployeeIndexPageComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  id?: string | number;
  show: boolean = true;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private EmployeePersonalDataService: EmployeePersonalDataService
  ) {}

  ngOnInit(): void {
    this.EmployeePersonalDataService.getData().subscribe((result) => {
      this.show = result
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
  ngOnDestroy() {
    // this.sub.unsubscribe();
    this.EmployeePersonalDataService.setData(true)
  }
}
