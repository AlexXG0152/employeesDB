import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const USER_KEY = environment.USER_KEY;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async clean(): Promise<void> {
    window.localStorage.clear();
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
