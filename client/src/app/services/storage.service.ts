import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private USER_KEY = environment.USER_KEY;

  constructor() {}

  public clean(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loginStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  loginStatusChange(result: boolean): void {
    this.loggedIn.next(result);
  }


}
