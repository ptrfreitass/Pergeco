import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id?: number;
  message: string;
  type: ToastType;
  duration?: number; // Duration in milliseconds
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  private toastId = 0;

  getToast(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }

  show(type: ToastType, message: string) {
    this.toastId++;
    this.toastSubject.next({ type, message, id: this.toastId });
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  info(message: string) {
    this.show('info', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }
 
}
