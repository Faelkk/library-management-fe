import { Component } from '@angular/core';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth-service.service';
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
  isLoading: boolean = false;

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
    this.router.navigate(['auth/signin']);
  }

  submit() {
    if (this.recoveryPasswordForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.authService
      .recoveryPassword(this.recoveryPasswordForm.value.email)
      .subscribe({
        next: () => {
          this.toastService.success(
            'Se uma aconta com esse email existir, o email foi enviado'
          );
          this.router.navigate(['auth/signin']);
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
