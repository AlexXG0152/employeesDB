import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getTodayBirthdays(date: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/reports/todayBirtdays/${date}`)
  }
}
