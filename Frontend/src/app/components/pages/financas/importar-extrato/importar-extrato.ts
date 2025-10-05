import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Category } from '../../../../services/financas/category/category';
import { CategoryService, Subcategory } from '../../../../services/financas/category/category';

interface RegistroExtrato {
  data: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valido?: boolean;
  erro?: string;
  categoria_id?: number | null;
  subcategoria_id?: number | null;
}

@Component({
  selector: 'app-importar-extrato',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './importar-extrato.html',
  styleUrl: './importar-extrato.scss',
  providers: [
    CurrencyPipe,
    DatePipe
  ]
})
export class ImportarExtrato implements OnInit {
  categorias: Category[] = [];

  arquivoSelecionado: File | null = null;
  registros: RegistroExtrato[] = [];
  erro: string | null = null;
  carregando = false;

  constructor(
    private categoryService: CategoryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoryService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      }
    });
  }

  getCategoriasPorTipo(tipo: string): Category[] {
    return this.categorias.filter(cat => cat.type === tipo);
  }

  getSubcategoriasDaCategoria(idCategoria: number): Subcategory[] {
    const categoria = this.categorias.find(c => c.id === idCategoria);
    return categoria?.subcategories ?? [];
  }

  onArquivoSelecionado(event: any): void {
    const file = event.target.files[0];
    if (file) this.arquivoSelecionado = file;
  }

  enviarArquivo(): void {
    if (!this.arquivoSelecionado) return;

    this.carregando = true;
    this.erro = null;

    const formData = new FormData();
    formData.append('arquivo', this.arquivoSelecionado);

    this.http.post<any>('http://localhost/api/importar-extrato', formData).subscribe({
      next: (res) => {
        this.registros = res.registros.map((r: any) => this.validarRegistro(r));
        this.carregando = false;
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.status === 422
          ? 'Arquivo inválido. Verifique o formato e tente novamente.'
          : 'Erro ao importar extrato. Tente novamente mais tarde.';
        console.error(err);
      }
    });
  }

  validarRegistro(registro: RegistroExtrato): RegistroExtrato {
    let erro = '';
    if (!registro.data || !registro.valor || !registro.tipo || !registro.descricao) {
      erro = 'Campos obrigatórios ausentes.';
    } else if (registro.tipo === 'receita' && registro.valor < 0) {
      erro = 'Valor negativo em uma receita.';
    } else if (registro.tipo === 'despesa' && registro.valor < 0) {
      erro = 'Valor negativo em uma despesa. Deseja manter assim?';
    }

    return {
      ...registro,
      valido: erro === '',
      erro: erro || undefined
    };
  }

  excluirRegistro(index: number): void {
    this.registros.splice(index, 1);
  }

  salvarRegistros(): void {
    // Aqui você pode implementar o envio final para o backend
    console.log('Registros a salvar:', this.registros.filter(r => r.valido));
  }

  get nenhumRegistroValido(): boolean {
    return Array.isArray(this.registros) && this.registros.filter(r => r.valido).length === 0;
  }

}
