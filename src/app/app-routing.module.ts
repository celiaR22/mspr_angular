import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
