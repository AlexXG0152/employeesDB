import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeePersonalDataService {
  constructor(private http: HttpClient) {}

  allSearchResults$ = new BehaviorSubject<any>('');
  oneSearchResult$ = new BehaviorSubject<any>('');
  showContentOnHomePage$ = new BehaviorSubject<boolean>(true);

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `http://localhost:8080/api/employee/${id}`
    );
  }

  getEmployeeByFirstName(firstName: string): Observable<Employee> {
    return this.http.get<Employee>(
      `http://localhost:8080/api/employee/firstName/${firstName}`
    );
  }

  passResults(results: any): void {
    this.allSearchResults$.next(results);
  }

  getPassedResults(): Observable<any> {
    return this.allSearchResults$.asObservable();
  }

  passOneResult(result: any): void {
    this.oneSearchResult$.next(result);
  }

  getOnePassedResult(): Observable<any> {
    return this.oneSearchResult$.asObservable();
  }

  passShowContentOnHomePage(result: boolean): void {
    this.showContentOnHomePage$.next(result);
  }

  getShowContentOnHomePage(): Observable<boolean> {
    return this.showContentOnHomePage$.asObservable();
  }

}
