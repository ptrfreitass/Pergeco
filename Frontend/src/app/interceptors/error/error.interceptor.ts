import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../services/toast/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Erro HTTP Interceptado:', error);

      if (error.status === 0) {
        toastService.error('Servidor fora do ar.');
      } else if (error.status === 401) {
        toastService.error('Sessão expirada ou token inválido.');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        toastService.error('Acesso negado.');
      } else if (error.status === 404) {
        toastService.error('Recurso não encontrado.');
      } else if (error.status === 422) {
        toastService.error('As credenciais fornecidas estão incorretas.');
      } else if (error.status >= 500) {
        toastService.error('Erro interno do servidor.');
      } else {
        toastService.error('Erro inesperado.');
      }

      return throwError(() => error);
    })
  );
};