import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeCertificate } from '../interfaces/employeeCertificate';

@Injectable({
  providedIn: 'root',
})
export class EmployeePrintFormsService {
  constructor(private http: HttpClient) {}

  createCertificateFromWorkPlace(id: string, employee: IEmployeeCertificate): Observable<string> {
    return this.http.post<string>(
      `http://localhost:8080/api/employee/${id}/print-forms`,
      employee
    );
  }
  download(id: string, filename: string): Observable<Blob> {
    return this.http.get(
      `http://localhost:8080/api/employee/${id}/print-forms/${filename}`,
      {
        responseType: 'blob',
      }
    );
  }
}
