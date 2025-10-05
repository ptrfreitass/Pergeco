import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:80/api'; // URL base da API Laravel

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string, passwordConfirmation: string) {
  return this.http.post<any>(`${this.apiUrl}/register`, {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation
  });
}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    const token = localStorage.getItem('token');

    if (token) {
      this.http.post(`${this.apiUrl}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: () => {
          console.log('Logout realizado no servidor');
          this.limparSessao();
        },
        error: (err) => {
          console.error('Erro no logout do servidor:', err);
          // Mesmo se der erro no backend, limpa o frontend
          this.limparSessao();
        }
      });
    } else {
      this.limparSessao();
    }
  }

  private limparSessao() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser(): { name: string; email: string } | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

}