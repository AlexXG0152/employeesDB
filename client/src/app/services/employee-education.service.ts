import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeEducationService {
  constructor(private http: HttpClient) {}

  getEmployeeEducation(id: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/employee/${id}/education`
    );
  }

  deleteEmployeeEducation(id: number, _id: any): Observable<any> {
    const options = {
      body: {
        _id,
      },
    };
    return this.http.delete<any>(
      `http://localhost:8080/api/employee/${id}/education`,
      options
    );
  }
}
