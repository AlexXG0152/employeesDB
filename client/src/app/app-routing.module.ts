import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './auth/board-admin/board-admin.component';
import { BoardModeratorComponent } from './auth/board-moderator/board-moderator.component';
import { BoardUserComponent } from './auth/board-user/board-user.component';
import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResultPageComponent } from './core/result-page/result-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  // { path: 'searchResults', component: ResultPageComponent },
  {
    path: 'employee/:id/',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    data: { preload: true },
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent },
];
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
