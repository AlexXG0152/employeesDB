import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share } from 'rxjs';
import { Employees } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Employees[]> {
    return this.http.get<Employees[]>('https://dummyjson.com/users');
  }
  getUserByName(name: string): Observable<Employees> {
    return this.http.get<Employees>(
      `https://dummyjson.com/users/search?q=${name}`
    );
  }
}
