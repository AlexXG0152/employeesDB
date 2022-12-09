import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { HeaderComponent } from './header/header.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeModule } from '../employee/employee.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { NgMaterialModule } from '../ng-material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchFilterPipe,
    ResultPageComponent,
    PageNotFoundComponent,
    UploadFilesComponent,
    DashboardComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMaterialModule,
    EmployeeModule,
  ],
  exports: [
    SearchFilterPipe,
    ResultPageComponent,
    SearchComponent,
    DashboardComponent,
    TableComponent,
  ],
})
export class CoreModule {}
