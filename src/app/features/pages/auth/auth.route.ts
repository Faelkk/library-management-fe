import { Routes } from '@angular/router';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { RecoveryPasswordComponent } from '../auth/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

export const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recovery-password', component: RecoveryPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
