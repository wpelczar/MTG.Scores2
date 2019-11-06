import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
      { path: 'login', component: LoginComponent },
      { path: 'auth-callback', component: AuthCallbackComponent  },
      { path: 'register', component: RegisterComponent  }
  ];

@NgModule({
  declarations: [LoginComponent, AuthCallbackComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AccountModule { }
