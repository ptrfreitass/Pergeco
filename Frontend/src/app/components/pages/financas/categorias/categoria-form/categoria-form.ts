import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CategoryService, Category, Subcategory } from '../../../../../services/financas/category/category';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './categoria-form.html',
  styleUrl: './categoria-form.scss'
})
export class CategoriaForm {
  @Input() categoria: Category | null = null;
  @Output() finalizado = new EventEmitter<void>();
  @Output() categoriaCriada = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['despesa', Validators.required],
      subcategories: this.fb.array([])
    });
  }
  
  ngOnInit(): void {
    if(this.categoria) {
      this.form.patchValue({
        name: this.categoria.name,
        type: this.categoria.type || 'despesa',
      });

      this.categoria.subcategories.forEach((sub: Subcategory) => {
        this.subcategories.push(this.fb.group({
          id: [sub.id],
          name: [sub.name, Validators.required]
        }));
      });
    }
  }

  get subcategories(): FormArray {
    return this.form.get('subcategories') as FormArray;
  }

  adicionarSubcategoria() {
    this.subcategories.push(this.fb.group({
      id: [null],
      name: ['', Validators.required]
    }));
  }

  removerSubcategoria(index: number) {
    const sub = this.subcategories.at(index).value;
    if(sub.id) {
      this.categoryService.deleteSubcategory(sub.id).subscribe();
    }
    this.subcategories.removeAt(index);
  }
salvar() {
    if (this.form.invalid) return;

    const { name, type, subcategories } = this.form.value;

    if (this.categoria) {
      // edição
      this.categoryService.update(this.categoria.id, { name, type }).subscribe({
        next: () => {
          subcategories.forEach((sub: any) => {
            if (sub.id) {
              this.categoryService.updateSubcategory(sub.id, { name: sub.name }).subscribe();
            } else {
              this.categoryService.createSubcategory({
                name: sub.name,
                category_id: this.categoria!.id
              }).subscribe();
            }
          });

          this.finalizado.emit();
        }
      });
    } else {
      // criação
      this.categoryService.create({ name, type }).subscribe({
        next: (categoriaCriada) => {
          subcategories.forEach((sub: any) => {
            this.categoryService.createSubcategory({
              name: sub.name,
              category_id: categoriaCriada.id
            }).subscribe();
          });

          this.finalizado.emit();
        }
      });
    }
  }

  excluirCategoria() {
    if (this.categoria && confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.delete(this.categoria.id).subscribe(() => {
        this.finalizado.emit();
      });
    }
  }
}
