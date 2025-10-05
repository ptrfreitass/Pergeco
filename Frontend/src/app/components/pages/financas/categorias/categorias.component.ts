import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CategoryService } from '../../../../services/financas/category/category';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmarExclusaoModal } from '../../../../shared/confirmar-exclusao-modal/confirmar-exclusao-modal';
import { ToastService } from '../../../../services/toast/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule
],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent implements OnInit {

  // Dados principais
  categorias: Category[] = [];
  carregando = true;
  erro: string | null = null;

  // Estados de edição/expansão
  expandedCategoriaId: number | null = null;
  editandoCategoriaId: number | null = null;
  editandoSubcategoriaId: number | null = null;

  // Edição de nomes
  categoriaEditandoNome = '';
  subcategoriaEditandoNome: Record<number, string> = {};

  // Controle de formulário de nova categoria
  mostrarFormulario = false;
  categoriaSelecionada: Category | null = null;

  // Exclusão de categoria
  categoriaParaExcluir: Category | null = null;
  private modalInstance: any = null;

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  /** Carrega as categorias disponíveis (padrão e do usuário) */
  carregarCategorias(): void {
    this.carregando = true;
    this.categoryService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
        this.erro = 'Erro ao carregar categorias.';
        this.carregando = false;
      },
    });
  }

  /** Mostra o formulário para criar nova categoria */
  abrirFormularioNova(): void {
    this.mostrarFormulario = true;
    this.categoriaSelecionada = null;
  }

  criarCategoria(): void {
    const nome = this.categoriaEditandoNome.trim();
    const tipo = this.categoriaSelecionada?.type ?? null;

    if (!nome) return;

    this.categoryService.create({ name: nome, type: tipo ?? undefined}).subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.categoriaEditandoNome = '';
        this.categoriaSelecionada = null;
        this.carregarCategorias();
      },
      error: (err) => {
        console.error('Erro ao criar categoria:', err);
      },
    });
  }
    getCorTipo(tipo: string | null): string {
    switch (tipo) {
      case 'receita':
        return 'border-success';
      case 'despesa':
        return 'border-danger';
      default:
        return 'border-primary';
    }
  }

  /** Atribui categoria selecionada para edição via form */
  editarCategoria(cat: Category): void {
    this.categoriaSelecionada = cat;
    this.mostrarFormulario = false;
  }

  /** Finaliza qualquer estado de edição aberto */
  finalizarEdicao(): void {
    this.editandoCategoriaId = null;
    this.editandoSubcategoriaId = null;
    this.expandedCategoriaId = null;
    this.categoriaSelecionada = null;
    this.mostrarFormulario = false;
    this.carregarCategorias();
  }

  /** Abre ou fecha o bloco de subcategorias */
  toggleExpand(id: number): void {
    this.expandedCategoriaId = this.expandedCategoriaId === id ? null : id;
    this.editandoCategoriaId = null; // Evita editar enquanto expandido
  }

  isExpanded(id: number): boolean {
    return this.expandedCategoriaId === id;
  }

  /** Habilita edição inline de uma categoria */
  editarCategoriaInline(categoria: Category): void {
    this.editandoCategoriaId = categoria.id;
    this.categoriaEditandoNome = categoria.name;
  }

  /** Salva o nome editado da categoria */
  salvarEdicaoCategoria(categoria: Category): void {
    const novoNome = this.categoriaEditandoNome.trim();
    if (!novoNome) return;

    this.categoryService.update(categoria.id, { name: novoNome }).subscribe({
      next: () => this.finalizarEdicao(),
      error: (err) => console.error('Erro ao salvar categoria:', err),
    });
  }

  /** Adiciona uma nova subcategoria a uma categoria */
  adicionarSubcategoria(categoria: Category): void {
    const novaSub = {
      name: 'Nova Subcategoria',
      category_id: categoria.id,
      user_id: null,
    };

    this.categoryService.createSubcategory(novaSub).subscribe({
      next: () => this.carregarCategorias(),
      error: (err) => console.error('Erro ao adicionar subcategoria', err),
    });
  }

  /** Habilita edição inline de uma subcategoria */
  editarSubcategoriaInline(sub: any): void {
    this.editandoSubcategoriaId = sub.id;
    this.subcategoriaEditandoNome[sub.id] = sub.name;
  }

  /** Salva nome editado da subcategoria */
  salvarEdicaoSubcategoria(sub: any): void {
    const novoNome = this.subcategoriaEditandoNome[sub.id]?.trim();
    if (!novoNome) return;

    this.categoryService.updateSubcategory(sub.id, { name: novoNome }).subscribe({
      next: () => this.finalizarEdicao(),
      error: (err) => console.error('Erro ao salvar subcategoria:', err),
    });
  }

  /** Abre modal Bootstrap para confirmar exclusão de categoria */
  abrirModalExclusao(categoria: Category): void {
  const modalRef = this.modalService.open(ConfirmarExclusaoModal, {
    centered: true,
    backdrop: 'static',
    keyboard: false
  });

  modalRef.componentInstance.categoria = categoria;

  modalRef.result.then(
    (resultado: string) => {
      if (resultado === 'confirmado') {
        this.excluirCategoriaConfirmada(categoria);
      }
    },
    () => {
      // Modal cancelado, nenhuma ação necessária
    }
  );
}

  /** Fecha o modal de exclusão */
  fecharModalExclusao(): void {
  if (this.modalInstance) {
    this.modalInstance.hide();

    // Aguarda animação do Bootstrap, então limpa
    setTimeout(() => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    }, 300); // Duração da animação do Bootstrap
  }
}

  /** Confirma exclusão da categoria */
  excluirCategoriaConfirmada(categoria: Category): void {
    this.carregando = true;

    this.categoryService.delete(categoria.id).subscribe({
      next: () => {
        this.carregando = false;
        this.carregarCategorias(); // Atualiza lista
      },
      error: (err) => {
      this.toastService.show('error','Erro ao excluir categoria.');
        console.error('Erro ao excluir categoria:', err);
        this.carregando = false;
      }
    });
  }

  /** Confirma exclusão de subcategoria individual */
  excluirSubcategoria(sub: any): void {
    if (!confirm(`Tem certeza que deseja excluir a subcategoria "${sub.name}"?`)) return;

    this.categoryService.deleteSubcategory(sub.id).subscribe({
      next: () => this.carregarCategorias(),
      error: (err) => console.error('Erro ao excluir subcategoria:', err),
    });
  }

  /** Restaura categorias padrão do sistema */
  restaurarPadroes(): void {
  if (!confirm('Tem certeza que deseja restaurar as categorias padrão que foram ocultadas?')) return;

  this.categoryService.restoreDefaultCategories().subscribe({
    next: () => {
      this.toastService.show('success','Categorias padrão restauradas com sucesso!');

      this.carregarCategorias(); // recarrega lista
    },
    error: (err) => {
      this.toastService.show('error','Erro ao restaurar categorias padrão.');
    }
  });
}

}
