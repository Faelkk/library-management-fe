import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';

interface SigninForm {
  email: FormControl;
  password: FormControl;
}

@Inject(AuthServiceService)
@Component({
  selector: 'app-signin',
  imports: [
    InputComponent,
    ReactiveFormsModule,
    ButtonComponent,
    AuthHeaderComponent,
  ],
  providers: [AuthServiceService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  signinForm!: FormGroup<SigninForm>;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private toastService: ToastrService
  ) {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  submit() {
    if (this.signinForm.invalid) {
      return;
    }

    this.authService
      .signin(this.signinForm.value.email, this.signinForm.value.password)
      .subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('auth-token', response.token);
            this.toastService.success('Login feito com sucesso!');
            this.router.navigate(['user']);
          } else if (response.message?.includes('dois fatores')) {
            this.toastService.info(
              'Código de verificação enviado para seu e-mail.'
            );
            this.router.navigate(['verify-two-fa'], {
              queryParams: { email: response.email },
            });
          } else {
            this.toastService.error('Resposta inesperada do servidor.');
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
