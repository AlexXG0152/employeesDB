import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeePrintFormsService {
  constructor(private http: HttpClient) {}

  createCertificateFromWorkPlace(employee: any): Observable<string> {
    return this.http.post<string>(
      `http://localhost:8080/api/employee/${employee.employee.employeeID}/print-forms`,
      employee
    );
  }
  download(id: number, filename: string): Observable<any> {
    return this.http.get(
      `http://localhost:8080/api/employee/${id}/print-forms/${filename}`,
      {
        responseType: 'blob',
      }
    );
  }
}
