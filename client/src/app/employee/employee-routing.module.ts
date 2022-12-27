import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { UploadFilesComponent } from '../core/upload-files/upload-files.component';
import { EmployeeEducationComponent } from './employee-education/employee-education.component';
import { EmployeeFamilyComponent } from './employee-family/employee-family.component';
import { EmployeeGrowthPlanComponent } from './employee-growth-plan/employee-growth-plan.component';
import { EmployeeIndexPageComponent } from './employee-index-page/employee-index-page.component';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';
import { EmployeePrintFormsComponent } from './employee-print-forms/employee-print-forms.component';
import { EmployeeWorkScheduleComponent } from './employee-work-schedule/employee-work-schedule.component';
import { AuthGuard } from '../helpers/auth.guard';

const employeeRoutes: Routes = [
  {
    path: 'employee/:id',
    component: EmployeeIndexPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeePersonalDataComponent },
      { path: 'personal', redirectTo: '' },
      { path: 'family', component: EmployeeFamilyComponent },
      { path: 'education', component: EmployeeEducationComponent },
      { path: 'upload', component: UploadFilesComponent },
      { path: 'growth-plan', component: EmployeeGrowthPlanComponent },
      { path: 'print-forms', component: EmployeePrintFormsComponent },
      { path: 'work-schedule', component: EmployeeWorkScheduleComponent },
      { path: 'help', component: PageNotFoundComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
