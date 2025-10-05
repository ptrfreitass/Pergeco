import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  loginEmail = '';
  loginPassword = '';

  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerPasswordConfirmation = '';

  loginErrorMessage = '';
  registerErrorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  private validateLoginFields(): boolean {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginErrorMessage = 'Por favor, preencha todos os campos de login.';
      return false;
    }
    this.loginErrorMessage = '';
    return true;
  }

  private validateRegisterFields(): boolean {
    if (!this.registerName || !this.registerEmail || !this.registerPassword || !this.registerPasswordConfirmation) {
      this.registerErrorMessage = 'Preencha todos os campos de registro!';
      return false;
    }
    if (this.registerPassword !== this.registerPasswordConfirmation) {
      this.registerErrorMessage = 'As senhas não coincidem!';
      return false;
    }
    this.registerErrorMessage = '';
    return true;
  }

  login() {
    if (!this.validateLoginFields()) return;

    this.loading = true;
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toastService.success('Login realizado com sucesso!');
        this.authService.saveToken(res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erro no Login:', err);
        this.loginErrorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
      }
    });
  }

  register() {
    if (!this.validateRegisterFields()) return;

    this.loading = true;
    this.authService.register(this.registerName, this.registerEmail, this.registerPassword, this.registerPasswordConfirmation).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.toastService.success('Registro realizado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro ao registrar:', error);
        this.registerErrorMessage = 'Erro ao registrar: ' + (error.error.message || 'Tente novamente.');
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
