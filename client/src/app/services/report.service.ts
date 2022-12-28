import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  IFiredInYear,
  IHiredInYear,
  ITodayBirthdays,
} from '../interfaces/dashboard';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ReportService {

  private URL = environment.REPORTS_URL;

  constructor(private http: HttpClient) {}

  getTodayBirthdays(date: string): Observable<ITodayBirthdays[]> {
    return this.http.get<ITodayBirthdays[]>(
      `${this.URL}/todayBirtdays/${date}`
    );
  }

  getFiredInThisYear(year: string): Observable<IFiredInYear[]> {
    return this.http.get<IFiredInYear[]>(
      `${this.URL}/getFiredInThisYear/${year}`
    );
  }

  getHiredInThisYear(year: string): Observable<IHiredInYear[]> {
    return this.http.get<IHiredInYear[]>(
      `${this.URL}/getHiredInThisYear/${year}`
    );
  }

  // allDashboardResults$ = new BehaviorSubject<any>('');
  // passDashboardData(name:string, results: IFiredInYear[] | IHiredInYear[]): void {
  //   this.allDashboardResults$.next([...this.allDashboardResults$.value, {[name]: results}])
  // }
  // getDashboardData(): Observable<IFiredInYear[] | IHiredInYear[]> {
  //   return this.allDashboardResults$.asObservable();
  // }

  // getTodayBirthdays(date: string): Observable<any> {
  //   return this.http.get('http://httpstat.us/404');
  // }

  // getFiredInThisYear(year: string): Observable<any> {
  //   return this.http.get('http://httpstat.us/404');
  // }

  // getHiredInThisYear(year: string): Observable<any> {
  //   return this.http.get('http://httpstat.us/404');
  // }
}
