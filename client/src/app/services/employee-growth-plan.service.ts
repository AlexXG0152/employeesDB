import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGrowthPlanService {
  constructor(private http: HttpClient) {}

  createEmployeeGrowthPlan(id: string, details: any) {
    details.employeeID = id;
    const body = { details };
    return this.http.post<any>(
      `http://localhost:8080/api/employee/${id}/growth-plan`,
      body
    );
  }

  getEmployeeGrowthPlan(id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/employee/${id}/growth-plan`
    );
  }

  patchEmployeeGrowthPlan(id: string, details: any) {
    const body = {
      _id: details._id,
      details,
    };
    return this.http.patch<any>(
      `http://localhost:8080/api/employee/${id}/growth-plan`,
      body
    );
  }

  deleteEmployeeGrowthPlan(id: string, _id: string): Observable<any> {
    const options = {
      body: { _id },
    };
    return this.http.delete<any>(
      `http://localhost:8080/api/employee/${id}/growth-plan`,
      options
    );
  }
}