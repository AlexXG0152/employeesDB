import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { CommonModule } from '@angular/common';
import { EmployeeModule } from './employee/employee.module';
import { NgMaterialModule } from './ng-material.module';
// import { SharedModule } from './shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    AuthModule,
    CoreModule,
    EmployeeModule,
    // SharedModule
  ],
  exports:[],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
