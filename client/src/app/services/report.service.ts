import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  allDashboardResults$ = new BehaviorSubject<any>('');

  getTodayBirthdays(date: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/reports/todayBirtdays/${date}`
    );
  }

  getFiredInThisYear(year: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/reports/getFiredInThisYear/${year}`
    );
  }

  getHiredInThisYear(year: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/reports/getHiredInThisYear/${year}`
    );
  }

  passDashboardData(name:string, results: any): void {
    this.allDashboardResults$.next([...this.allDashboardResults$.value, {[name]: results}])
  }

  getDashboardData(): Observable<any> {
    return this.allDashboardResults$.asObservable();
  }
}
