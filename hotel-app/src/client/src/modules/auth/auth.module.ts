import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { canActivateAnonymous } from '../../guards/anonymous.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [canActivateAnonymous]
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [],

  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
