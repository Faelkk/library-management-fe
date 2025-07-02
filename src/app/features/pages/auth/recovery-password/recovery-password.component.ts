import { Component } from '@angular/core';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

interface RecoveryPasswordForm {
  email: FormControl;
}

@Component({
  selector: 'app-recovery-password',
  imports: [
    AuthHeaderComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css',
})
export class RecoveryPasswordComponent {
  recoveryPasswordForm!: FormGroup<RecoveryPasswordForm>;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private toastService: ToastrService
  ) {
    this.recoveryPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  submit() {
    if (this.recoveryPasswordForm.invalid) {
      return;
    }

    this.authService
      .recoveryPassword(this.recoveryPasswordForm.value.email)
      .subscribe({
        next: (response) => {
          if (response.Token) {
            localStorage.setItem('auth-token', response.Token);
            this.toastService.success('Login feito com sucesso!');
            this.router.navigate(['dashboard']);
          }
        },
        error: () => {
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde.'
          );
        },
      });
  }
}
