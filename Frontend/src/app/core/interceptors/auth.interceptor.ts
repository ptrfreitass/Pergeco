import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

/**
 * Interceptor to add authentication token to all HTTP requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  // Debug logs (remover em produção)
  console.log('🔒 Auth Interceptor executado');
  console.log('📍 URL:', req.url);
  console.log('🎫 Token:', token ? `${token.substring(0, 20)}...` : 'Não existe');

  // Clone request and add authorization header if token exists
  if (token) {
    console.log('✅ Adicionando header Authorization');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.log('❌ Token não encontrado, header não adicionado');
  }

  return next(req);
};
