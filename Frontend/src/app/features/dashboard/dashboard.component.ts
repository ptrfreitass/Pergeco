import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  currentUser: User | null = null;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Logout error:', error);
        // Even if error, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }

  // Método de teste para verificar o interceptor
  testInterceptor(): void {
    console.log('🧪 Testando interceptor...');
    this.http.get(`${environment.apiUrl}/auth/me`).subscribe({
      next: (response) => {
        console.log('✅ Resposta recebida:', response);
        alert('Interceptor funcionando! Verifique o console e a aba Network.');
      },
      error: (error) => {
        console.error('❌ Erro na requisição:', error);
        alert('Erro na requisição. Verifique o console.');
      }
    });
  }
}