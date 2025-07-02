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

interface SignupForm {
  email: FormControl;
  password: FormControl;
  name: FormControl;
  phoneNumber: FormControl;
}

@Component({
  selector: 'app-signup',
  imports: [
    AuthHeaderComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  navigate() {
    this.router.navigate(['signup']);
  }

  submit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService
      .signup(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      )
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
