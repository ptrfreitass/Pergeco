import { Component, Input } from '@angular/core';
import { Category } from '../../services/financas/category/category';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmar-exclusao-modal',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './confirmar-exclusao-modal.html',
  styleUrl: './confirmar-exclusao-modal.scss'
})
export class ConfirmarExclusaoModal {

  @Input() categoria!: Category;

  constructor(public activeModal: NgbActiveModal) {}

  confirmar(): void {
    this.activeModal.close('confirmado');
  }

  cancelar(): void {
    this.activeModal.dismiss('cancelado');
  }
}
