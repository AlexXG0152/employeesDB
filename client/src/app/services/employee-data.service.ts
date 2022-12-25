import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeEducation } from '../interfaces/employeeEducation';
import { IEmployeeFamilyMember } from '../interfaces/employeeFamilyMember';
import { IEmployeeGrowthTask } from '../interfaces/growthTask';
import { environment } from '../../environments/environment';

type EmployeeData = IEmployeeEducation | IEmployeeFamilyMember | IEmployeeGrowthTask
type Collection = 'education' | 'family' | 'growth-plan' | '';

const URL = environment.EMPLOYEE_URL;

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  constructor(private http: HttpClient) {}

  createEmployeeData(
    id: string,
    details: any,
    type: Collection
  ): Observable<EmployeeData> {
    return this.http.post<EmployeeData>(`${URL}/${id}/${type}`, { details });
  }

  getEmployeeData(id: string, type: Collection): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(`${URL}/${id}/${type}`);
  }

  patchEmployeeData(
    id: string,
    details: any,
    type: Collection
  ): Observable<EmployeeData> {
    return this.http.patch<EmployeeData>(`${URL}/${id}/${type}`, { details });
  }

  deleteEmployeeData(
    id: string,
    _id: string,
    type: Collection
  ): Observable<EmployeeData> {
    return this.http.delete<EmployeeData>(`${URL}/${id}/${type}`, { body: {_id} });
  }
}
