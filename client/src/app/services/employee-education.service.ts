import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeEducation } from '../interfaces/employeeEducation';

@Injectable({
  providedIn: 'root',
})
export class EmployeeEducationService {
  constructor(private http: HttpClient) {}

  createEmployeeEducation(id: string, details: any) {
    return this.http.post<IEmployeeEducation>(
      `http://localhost:8080/api/employee/${id}/education`,
      { details }
    );
  }

  getEmployeeEducation(id: string): Observable<IEmployeeEducation[]> {
    return this.http.get<IEmployeeEducation[]>(
      `http://localhost:8080/api/employee/${id}/education`
    );
  }

  patchEmployeeEducation(id: string, details: any) {
    return this.http.patch<IEmployeeEducation>(
      `http://localhost:8080/api/employee/${id}/education`,
      { details }
    );
  }

  deleteEmployeeEducation(
    id: string,
    _id: string
  ): Observable<IEmployeeEducation> {
    return this.http.delete<IEmployeeEducation>(
      `http://localhost:8080/api/employee/${id}/education`,
      { body: { _id } }
    );
  }
}
