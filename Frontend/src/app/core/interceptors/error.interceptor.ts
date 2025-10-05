import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

/**
 * Interceptor to handle HTTP errors globally
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // Handle 401 Unauthorized - token invalid or expired
      if (error.status === 401) {
        tokenService.removeToken();
        router.navigate(['/login']);
      }

      // Handle 403 Forbidden
      if (error.status === 403) {
        console.error('Acesso negado');
      }

      // Handle 404 Not Found
      if (error.status === 404) {
        console.error('Recurso não encontrado');
      }

      // Handle 500 Internal Server Error
      if (error.status === 500) {
        console.error('Erro interno do servidor');
      }

      return throwError(() => error);
    })
  );
};
