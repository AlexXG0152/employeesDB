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

  constructor(private observer: BreakpointObserver, private router: Router) {}

  ngOnInit(): void {}

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
  }
}
