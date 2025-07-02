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
import { Router, ActivatedRoute } from '@angular/router';

interface ResetPasswordForm {
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-reset-password',
  imports: [
    AuthHeaderComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup<ResetPasswordForm>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private toastService: ToastrService
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  submit() {
    if (
      this.resetPasswordForm.value.password !==
      this.resetPasswordForm.value.confirmPassword
    ) {
      this.toastService.error('As senhas não coincidem.');
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.toastService.error('Token inválido ou ausente.');
      return;
    }

    this.authService
      .resetPasswordForm(this.resetPasswordForm.value.password, token)
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
