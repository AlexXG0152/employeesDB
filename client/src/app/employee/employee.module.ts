import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeIndexPageComponent } from './employee-index-page/employee-index-page.component';
import { EmployeeFamilyComponent } from './employee-family/employee-family.component';
import { EmployeeEducationComponent } from './employee-education/employee-education.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeGrowthPlanComponent } from './employee-growth-plan/employee-growth-plan.component';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { EmployeePrintFormsComponent } from './employee-print-forms/employee-print-forms.component';
import { NgMaterialModule } from '../ng-material.module';
import { ModalComponent } from './modal/modal.component';
import { EmployeeWorkScheduleComponent } from './employee-work-schedule/employee-work-schedule.component';

@NgModule({
  declarations: [
    EmployeeIndexPageComponent,
    EmployeeFamilyComponent,
    EmployeeEducationComponent,
    EmployeePersonalDataComponent,
    EmployeeGrowthPlanComponent,
    EmployeeHeaderComponent,
    EmployeePrintFormsComponent,
    ModalComponent,
    EmployeeWorkScheduleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule,
    EmployeeRoutingModule,
  ],
  exports: [EmployeeHeaderComponent],
})
export class EmployeeModule {}
