import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import {
  IFiredInYear,
  IHiredInYear,
  ITodayBirthdays,
} from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getTodayBirthdays(date: string): Observable<ITodayBirthdays[]> {
    return this.http.get<ITodayBirthdays[]>(
      `http://localhost:8080/api/reports/todayBirtdays/${date}`
    );
  }

  getFiredInThisYear(year: string): Observable<IFiredInYear[]> {
    return this.http.get<IFiredInYear[]>(
      `http://localhost:8080/api/reports/getFiredInThisYear/${year}`
    );
  }

  getHiredInThisYear(year: string): Observable<IHiredInYear[]> {
    return this.http.get<IHiredInYear[]>(
      `http://localhost:8080/api/reports/getHiredInThisYear/${year}`
    );
  }

  // allDashboardResults$ = new BehaviorSubject<any>('');
  // passDashboardData(name:string, results: IFiredInYear[] | IHiredInYear[]): void {
  //   this.allDashboardResults$.next([...this.allDashboardResults$.value, {[name]: results}])
  // }
  // getDashboardData(): Observable<IFiredInYear[] | IHiredInYear[]> {
  //   return this.allDashboardResults$.asObservable();
  // }
}
