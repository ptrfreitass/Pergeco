# 🎨 Frontend - Pergeco

> Single Page Application desenvolvida em Angular 20 para o sistema Pergeco

[![Angular](https://img.shields.io/badge/Angular-20.0-red.svg)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org)
[![Material](https://img.shields.io/badge/Material-20.0-blue.svg)](https://material.angular.io)

---

## 📋 Índice

- [Sobre](#-sobre)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Desenvolvimento](#-desenvolvimento)
- [Build](#-build)
- [Testes](#-testes)
- [Estrutura](#-estrutura)
- [Padrões](#-padrões)

---

## 🎯 Sobre

Interface moderna e responsiva para o sistema de gestão financeira Pergeco, desenvolvida com Angular 20 e Angular Material.

### Funcionalidades

- 🔐 Autenticação completa
- 📊 Dashboard interativo
- 🏷️ Gerenciamento de categorias
- 💰 Registro de transações
- 📈 Relatórios visuais
- 🎨 Tema claro/escuro
- 📱 Totalmente responsivo
- ⚡ Performance otimizada

---

## 🚀 Tecnologias

- **Angular 20** - Framework
- **TypeScript 5.8** - Linguagem
- **Angular Material 20** - Componentes UI
- **Bootstrap 5** - Framework CSS
- **RxJS 7.8** - Programação reativa
- **Jasmine/Karma** - Testes

---

## 📦 Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- [npm](https://www.npmjs.com) ou [yarn](https://yarnpkg.com)
- [Angular CLI](https://angular.io/cli)

### Instalar Angular CLI

```bash
npm install -g @angular/cli
```

---

## 🔧 Instalação

### 1. Navegue até a pasta do frontend

```bash
cd Frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Os arquivos de environment já estão configurados em:
- `src/environments/environment.development.ts` (desenvolvimento)
- `src/environments/environment.ts` (produção)

Ajuste a URL da API se necessário.

---

## 🎮 Desenvolvimento

### Iniciar servidor de desenvolvimento

```bash
npm start
```

Ou:

```bash
ng serve
```

A aplicação estará disponível em: **http://localhost:4200**

### Iniciar com proxy (recomendado)

```bash
ng serve --proxy-config proxy.conf.json
```

Isso permite fazer requisições para `/api` sem problemas de CORS.

### Modo watch (rebuild automático)

```bash
ng build --watch --configuration development
```

---

## 🏗️ Build

### Build de desenvolvimento

```bash
npm run build
```

### Build de produção

```bash
ng build --configuration production
```

Os arquivos serão gerados em `dist/frontend/`.

### Build com análise de bundle

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/frontend/stats.json
```

---

## 🧪 Testes

### Executar testes unitários

```bash
npm test
```

Ou:

```bash
ng test
```

### Executar testes com cobertura

```bash
ng test --code-coverage
```

### Executar testes em modo headless

```bash
ng test --watch=false --browsers=ChromeHeadless
```

---

## 📁 Estrutura

```
Frontend/
├── src/
│   ├── app/
│   │   ├── core/                      # Módulo Core (singleton)
│   │   │   ├── guards/                # Guards de rota
│   │   │   ├── interceptors/          # HTTP Interceptors
│   │   │   ├── services/              # Serviços globais
│   │   │   └── models/                # Interfaces e tipos
│   │   │
│   │   ├── shared/                    # Módulo Shared (reutilizável)
│   │   │   ├── components/            # Componentes compartilhados
│   │   │   ├── pipes/                 # Pipes customizados
│   │   │   └── directives/            # Diretivas customizadas
│   │   │
│   │   ├── features/                  # Módulos de Features
│   │   │   ├── auth/                  # Autenticação
│   │   │   ├── dashboard/             # Dashboard
│   │   │   ├── categories/            # Categorias
│   │   │   └── transactions/          # Transações
│   │   │
│   │   ├── layout/                    # Layout da aplicação
│   │   │   ├── sidebar/               # Menu lateral
│   │   │   ├── header/                # Cabeçalho
│   │   │   └── footer/                # Rodapé
│   │   │
│   │   ├── app.component.ts           # Componente raiz
│   │   ├── app.config.ts              # Configuração da app
│   │   └── app.routes.ts              # Rotas principais
│   │
│   ├── assets/                        # Arquivos estáticos
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── environments/                  # Configurações de ambiente
│   │   ├── environment.ts             # Produção
│   │   └── environment.development.ts # Desenvolvimento
│   │
│   ├── styles/                        # Estilos globais
│   │   ├── _variables.scss            # Variáveis SCSS
│   │   ├── _mixins.scss               # Mixins SCSS
│   │   └── _themes.scss               # Temas
│   │
│   ├── index.html                     # HTML principal
│   ├── main.ts                        # Entry point
│   └── styles.scss                    # Estilos globais
│
├── public/                            # Arquivos públicos
│   └── favicon.ico
│
├── angular.json                       # Configuração Angular
├── package.json                       # Dependências
├── tsconfig.json                      # Configuração TypeScript
└── proxy.conf.json                    # Configuração de proxy
```

---

## 🎨 Padrões de Código

### Nomenclatura

- **Components**: `kebab-case` → `user-profile.component.ts`
- **Services**: `kebab-case` → `auth.service.ts`
- **Guards**: `kebab-case` → `auth.guard.ts`
- **Interceptors**: `kebab-case` → `auth.interceptor.ts`
- **Models**: `kebab-case` → `user.model.ts`
- **Pipes**: `kebab-case` → `currency-brl.pipe.ts`

### Estrutura de Componente

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-nome',
  standalone: true,
  imports: [],
  templateUrl: './nome.component.html',
  styleUrl: './nome.component.scss'
})
export class NomeComponent {
  // Propriedades públicas
  public title = 'Título';
  
  // Propriedades privadas
  private data: any;
  
  // Constructor com injeção de dependências
  constructor(
    private service: NomeService
  ) {}
  
  // Lifecycle hooks
  ngOnInit(): void {
    this.loadData();
  }
  
  // Métodos públicos
  public loadData(): void {
    // Implementação
  }
  
  // Métodos privados
  private processData(): void {
    // Implementação
  }
}
```

### Estrutura de Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NomeService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  public getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }
}
```

---

## 🔐 Autenticação

### Guards

- **AuthGuard**: Protege rotas que requerem autenticação
- **NoAuthGuard**: Redireciona usuários autenticados (ex: login)

### Interceptors

- **AuthInterceptor**: Adiciona token em todas as requisições
- **ErrorInterceptor**: Trata erros HTTP globalmente
- **LoadingInterceptor**: Controla estado de loading

### Fluxo

1. Usuário faz login
2. Token é armazenado no localStorage
3. AuthInterceptor adiciona token automaticamente
4. Guards protegem rotas privadas
5. ErrorInterceptor trata erros (ex: 401 → logout)

---

## 🎨 Temas

### Tema Claro/Escuro

O sistema suporta tema claro e escuro, configurado em `styles/_themes.scss`.

### Variáveis CSS

Principais variáveis em `styles/_variables.scss`:

```scss
// Cores primárias
$primary-color: #3f51b5;
$accent-color: #ff4081;
$warn-color: #f44336;

// Cores de status
$success-color: #4caf50;
$warning-color: #ff9800;
$error-color: #f44336;
$info-color: #2196f3;

// Espaçamentos
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
```

---

## 📱 Responsividade

### Breakpoints

```scss
// Mobile
$mobile: 576px;

// Tablet
$tablet: 768px;

// Desktop
$desktop: 1024px;

// Large Desktop
$desktop-lg: 1440px;
```

### Uso

```scss
@media (max-width: $mobile) {
  // Estilos mobile
}

@media (min-width: $tablet) and (max-width: $desktop) {
  // Estilos tablet
}

@media (min-width: $desktop) {
  // Estilos desktop
}
```

---

## 🚀 Performance

### Lazy Loading

Todos os módulos de features usam lazy loading:

```typescript
{
  path: 'dashboard',
  loadChildren: () => import('./features/dashboard/dashboard.routes')
    .then(m => m.routes)
}
```

### OnPush Change Detection

Componentes usam `ChangeDetectionStrategy.OnPush` quando possível:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### TrackBy em *ngFor

```typescript
trackById(index: number, item: any): number {
  return item.id;
}
```

```html
<div *ngFor="let item of items; trackBy: trackById">
  {{ item.name }}
</div>
```

---

## 🐛 Debug

### Angular DevTools

Instale a extensão [Angular DevTools](https://angular.io/guide/devtools) no Chrome.

### Console Logs

Em desenvolvimento, logs estão habilitados em `environment.development.ts`:

```typescript
enableDebug: true,
enableConsoleLog: true
```

---

## 📚 Documentação Adicional

- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io)
- [RxJS](https://rxjs.dev)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Siga os padrões de código
3. Escreva testes
4. Garanta que o build passa
5. Faça commit com mensagem descritiva
6. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">
  <p>Desenvolvido com ❤️ por Patrick</p>
</div>
