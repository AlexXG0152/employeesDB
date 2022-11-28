import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { UploadFilesComponent } from '../core/upload-files/upload-files.component';
import { EmployeeEducationComponent } from './employee-education/employee-education.component';
import { EmployeeFamilyComponent } from './employee-family/employee-family.component';
import { EmployeeIndexPageComponent } from './employee-index-page/employee-index-page.component';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';

const employeeRoutes: Routes = [
  {
    path: 'employee/:id',
    component: EmployeeIndexPageComponent,
    children: [
      { path: '', component: EmployeePersonalDataComponent },
      { path: 'personal', redirectTo: '' },
      { path: 'family', component: EmployeeFamilyComponent },
      { path: 'education', component: EmployeeEducationComponent },
      { path: 'upload', component: UploadFilesComponent },
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
