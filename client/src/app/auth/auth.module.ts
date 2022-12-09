import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../ng-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
  ],
  providers: [],
})
export class AuthModule {}
