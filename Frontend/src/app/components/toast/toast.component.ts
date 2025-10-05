import { Component, OnInit } from '@angular/core';
import { ToastService, Toast } from '../../services/toast/toast.service';  
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];
  subscription!: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.getToast().subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast.id!), 3500);
    });
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}