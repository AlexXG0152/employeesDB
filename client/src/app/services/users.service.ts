import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  searchResults$ = new BehaviorSubject<any>('');

  getUser(id: string): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:8080/api/employee/${id}`)
  }

  getUserByFirstName(firstName: string): Observable<Employee> {
    return this.http.get<Employee>(
      `http://localhost:8080/api/employee/firstName/${firstName}`
    );
  }

  passResults(results: any): void {
    this.searchResults$.next(results);
  }

  getPassedResults(): Observable<any> {
    return this.searchResults$.asObservable();
  }
}
