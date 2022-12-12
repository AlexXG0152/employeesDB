import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IEmployee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeePersonalDataService {
  constructor(private http: HttpClient) {}

  allSearchResults$ = new BehaviorSubject<any>('');
  oneSearchResult$ = new BehaviorSubject<any>('');
  showContentOnHomePage$: Subject<boolean> = new BehaviorSubject<boolean>(true);

  getEmployee(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`http://localhost:8080/api/employee/${id}`);
  }

  getEmployeeByFirstName(firstName: string): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(
      `http://localhost:8080/api/employee/firstName/${firstName}`
    );
  }

  createOneEmployee(details: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(`http://localhost:8080/api/employee/`, {
      details,
    });
  }

  passResults(results: IEmployee[]): void {
    this.allSearchResults$.next(results);
  }

  getPassedResults(): Observable<IEmployee[]> {
    return this.allSearchResults$.asObservable();
  }

  passOneResult(result: IEmployee): void {
    this.oneSearchResult$.next(result);
  }

  getOnePassedResult(): Observable<IEmployee> {
    return this.oneSearchResult$.asObservable();
  }

  passShowContentOnHomePage(result: boolean): void {
    this.showContentOnHomePage$.next(result);
  }

  getShowContentOnHomePage(): Observable<boolean> {
    return this.showContentOnHomePage$.asObservable();
  }
}
