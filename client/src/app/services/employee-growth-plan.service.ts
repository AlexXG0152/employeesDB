import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGrowthTask } from '../interfaces/growthTask';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGrowthPlanService {
  constructor(private http: HttpClient) {}

  createEmployeeGrowthPlan(id: string, details: any) {
    return this.http.post<IGrowthTask>(
      `http://localhost:8080/api/employee/${id}/growth-plan`,
      { details }
    );
  }

  getEmployeeGrowthPlan(id: string): Observable<IGrowthTask[]> {
    return this.http.get<IGrowthTask[]>(
      `http://localhost:8080/api/employee/${id}/growth-plan`
    );
  }

  patchEmployeeGrowthPlan(id: string, details: any) {
    return this.http.patch<IGrowthTask>(
      `http://localhost:8080/api/employee/${id}/growth-plan`,
      { details }
    );
  }

  deleteEmployeeGrowthPlan(id: string, _id: string): Observable<IGrowthTask> {
    return this.http.delete<IGrowthTask>(
      `http://localhost:8080/api/employee/${id}/growth-plan`,
      { body: { _id } }
    );
  }
}
