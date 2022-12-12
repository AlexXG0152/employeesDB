import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeEducation } from '../interfaces/employeeEducation';

@Injectable({
  providedIn: 'root',
})
export class EmployeeEducationService {
  constructor(private http: HttpClient) {}

  getEmployeeEducation(id: string): Observable<IEmployeeEducation[]> {
    return this.http.get<IEmployeeEducation[]>(
      `http://localhost:8080/api/employee/${id}/education`
    );
  }

  deleteEmployeeEducation(id: string, _id: string): Observable<IEmployeeEducation> {
    const options = {
      body: {
        _id,
      },
    };
    return this.http.delete<IEmployeeEducation>(
      `http://localhost:8080/api/employee/${id}/education`,
      options
    );
  }

  patchEmployeeEducation(id: string, details: any) {
    const body = {
      _id: details._id,
      details,
    };
    return this.http.patch<IEmployeeEducation>(
      `http://localhost:8080/api/employee/${id}/education`,
      body
    );
  }

  createEmployeeEducation(id: string, details: any) {
    details.employeeID = id;
    const body = {
      details,
    };

    return this.http.post<IEmployeeEducation>(
      `http://localhost:8080/api/employee/${id}/education`,
      body
    );
  }
}
