import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
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
  isLoading: boolean = false;

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
    this.router.navigate(['auth/recovery-password']);
  }

  submit() {
    if (this.signinForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService
      .signin(this.signinForm.value.email, this.signinForm.value.password)
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          if (response.token) {
            localStorage.setItem('auth-token', response.token);
            this.toastService.success('Login feito com sucesso!');
            this.router.navigate(['dashboard/books']);
          } else {
            this.toastService.error(
              'Dados incorretos, verifique a senha ou o email e tente novamente.'
            );
          }
        },
        error: () => {
          this.isLoading = false;
          this.toastService.error(
            'Erro inesperado! Tente novamente mais tarde.'
          );
        },
      });
  }
}
