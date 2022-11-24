import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeIndexPageComponent } from './employee-index-page/employee-index-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeFamilyComponent } from './employee-family/employee-family.component';
import { EmployeeEducationComponent } from './employee-education/employee-education.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';

@NgModule({
  declarations: [EmployeeIndexPageComponent, EmployeeFamilyComponent, EmployeeEducationComponent, EmployeePersonalDataComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    EmployeeRoutingModule
  ],
})
export class EmployeeModule {}