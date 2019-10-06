import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'auth-callback', component: AuthCallbackComponent  }
  ];

@NgModule({
  declarations: [LoginComponent, AuthCallbackComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AccountModule { }
