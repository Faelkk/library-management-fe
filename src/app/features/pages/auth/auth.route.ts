import { Routes } from '@angular/router';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { RecoveryPasswordComponent } from '../auth/recovery-password/recovery-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { NoAuthGuard } from '../../../core/guards/no-auth.guard';

export const authRoutes: Routes = [
  { path: 'signin', component: SigninComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [NoAuthGuard],
  },
];
