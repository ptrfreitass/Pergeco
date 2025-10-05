import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterRequest } from '../../../../core/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('password_confirmation');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const registerData: RegisterRequest = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.isLoading = false;
        
        if (error.status === 422) {
          // Validation errors from backend
          if (error.error.errors?.email) {
            this.errorMessage = 'Este e-mail já está cadastrado.';
          } else {
            this.errorMessage = 'Erro de validação. Verifique os dados.';
          }
        } else {
          this.errorMessage = 'Erro ao criar conta. Tente novamente.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }

  get passwordsMatch(): boolean {
    return !this.registerForm.errors?.['passwordMismatch'];
  }
}
