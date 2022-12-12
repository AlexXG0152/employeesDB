import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeFamilyMember } from '../interfaces/employeeFamilyMember';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFamilyService {
  constructor(private http: HttpClient) {}

  createEmployeeFamilyMember(id: string, details: any) {
    details.employeeID = id;
    const body = { details };
    return this.http.post<IEmployeeFamilyMember>(
      `http://localhost:8080/api/employee/${id}/family`,
      body
    );
  }

  getEmployeeFamilyMember(id: string): Observable<IEmployeeFamilyMember[]> {
    return this.http.get<IEmployeeFamilyMember[]>(
      `http://localhost:8080/api/employee/${id}/family`
    );
  }

  patchEmployeeFamilyMember(id: string, details: any) {
    const body = {
      _id: details._id,
      details,
    };
    return this.http.patch<IEmployeeFamilyMember>(
      `http://localhost:8080/api/employee/${id}/family`,
      body
    );
  }

  deleteEmployeeFamilyMember(id: string, _id: string): Observable<IEmployeeFamilyMember> {
    const options = {
      body: { _id },
    };
    return this.http.delete<IEmployeeFamilyMember>(
      `http://localhost:8080/api/employee/${id}/family`,
      options
    );
  }
}
