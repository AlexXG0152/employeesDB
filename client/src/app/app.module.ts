import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { EmployeeModule } from './employee/employee.module';
import { NgMaterialModule } from './ng-material.module';
import { interceptorProviders } from './helpers/interceptors';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot(),
  ],
  exports:[],
  providers: [interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
