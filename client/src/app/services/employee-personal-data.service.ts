import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IEmployee } from '../interfaces/employee';

type MaxID = {
  employeeID: number;
};
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

  getMaxEmployeeID(): Observable<MaxID[]> {
    return this.http.get<MaxID[]>(
      `http://localhost:8080/api/employee/getMaxEmployeeID`
    );
  }

  createEmployee(details: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(`http://localhost:8080/api/employee/`, {
      details,
    });
  }

  patchEmployeePersonalData(id: string, details: any): Observable<IEmployee> {
    return this.http.patch<IEmployee>(
      `http://localhost:8080/api/employee/${id}`,
      {
        details,
      }
    );
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

  messageSubject$: Subject<boolean> = new Subject<boolean>();
  setData(message: boolean) {
    this.messageSubject$.next(message);
  }
  getData(): Observable<boolean> {
    return this.messageSubject$.asObservable();
  }

  // paginator$ = new BehaviorSubject<any>('');
  // passPaginatorResults(paginator: any): void {
  //   this.paginator$.next(paginator);
  // }

  // getPassedPaginatorResults(): Observable<any> {
  //   return this.paginator$.asObservable();
  // }
}
