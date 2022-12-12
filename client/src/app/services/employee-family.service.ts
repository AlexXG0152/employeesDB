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
    return this.http.post<IEmployeeFamilyMember>(
      `http://localhost:8080/api/employee/${id}/family`,
      { details }
    );
  }

  getEmployeeFamilyMember(id: string): Observable<IEmployeeFamilyMember[]> {
    return this.http.get<IEmployeeFamilyMember[]>(
      `http://localhost:8080/api/employee/${id}/family`
    );
  }

  patchEmployeeFamilyMember(id: string, details: any) {
    return this.http.patch<IEmployeeFamilyMember>(
      `http://localhost:8080/api/employee/${id}/family`,
      { details }
    );
  }

  deleteEmployeeFamilyMember(
    id: string,
    _id: string
  ): Observable<IEmployeeFamilyMember> {
    return this.http.delete<IEmployeeFamilyMember>(
      `http://localhost:8080/api/employee/${id}/family`,
      { body: { _id } }
    );
  }
}
