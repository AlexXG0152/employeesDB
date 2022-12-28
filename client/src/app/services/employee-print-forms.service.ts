import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeCertificate } from '../interfaces/employeeCertificate';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class EmployeePrintFormsService {

  private URL = environment.EMPLOYEE_URL;

  constructor(private http: HttpClient) {}

  createCertificateFromWorkPlace(
    id: string,
    employee: IEmployeeCertificate
  ): Observable<string> {
    return this.http.post<string>(`${this.URL}/${id}/print-forms`, employee);
  }
  download(id: string, filename: string): Observable<Blob> {
    return this.http.get(`${this.URL}/${id}/print-forms/${filename}`, {
      responseType: 'blob',
    });
  }
}
