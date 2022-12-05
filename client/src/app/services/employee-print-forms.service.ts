import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeePrintFormsService {
  constructor(private http: HttpClient) {}

  createCertificateFromWorkPlace(): Observable<Employee> {
    return this.http.get<Employee>(
      `http://localhost:8080/api/employee/777/print-forms`
    );
  }
}
