# ✅ Checklist de Desenvolvimento - Pergeco

## 🎯 Como usar este checklist

Marque cada item conforme for completando. Isso te ajuda a:
- ✅ Não esquecer nenhuma etapa
- ✅ Visualizar o progresso
- ✅ Manter o foco
- ✅ Celebrar pequenas vitórias

---

## 📦 Sprint 0: Fundação (CONCLUÍDA ✅)

- [x] Criar documentação completa
- [x] Criar ROADMAP.md
- [x] Criar ESTRUTURA.md
- [x] Criar GUIA_RECOMECO.md
- [x] Atualizar README.md principal
- [x] Criar Backend/README.md
- [x] Criar Frontend/README.md
- [x] Criar Backend/.env.example
- [x] Criar Frontend/environments
- [x] Criar Frontend/proxy.conf.json
- [x] Fazer backup do código antigo

---

## 🔐 Sprint 1: Autenticação Completa

### Backend

#### Estrutura Base
- [x] Criar pasta `app/Http/Controllers/Api`
- [x] Criar pasta `app/Http/Requests/Auth`
- [x] Criar pasta `app/Http/Resources`
- [x] Criar pasta `app/Services`

#### Migration
- [x] Criar migration `create_users_table` (se não existir)
- [x] Adicionar campos: name, email, password, remember_token
- [x] Rodar migration: `sail artisan migrate`

#### Controllers
- [x] Criar `AuthController.php`
  - [x] Método `register(RegisterRequest $request)`
  - [x] Método `login(LoginRequest $request)`
  - [x] Método `logout(Request $request)`
  - [x] Método `me(Request $request)`

#### Requests (Validação)
- [x] Criar `RegisterRequest.php`
  - [x] Validar: name (required, string, max:255)
  - [x] Validar: email (required, email, unique:users)
  - [x] Validar: password (required, min:8, confirmed)
- [x] Criar `LoginRequest.php`
  - [x] Validar: email (required, email)
  - [x] Validar: password (required)

#### Resources (Serialização)
- [x] Criar `UserResource.php`
  - [x] Retornar: id, name, email, created_at

#### Rotas
- [x] Configurar rotas em `routes/api.php`
  - [x] POST `/api/register` (público)
  - [x] POST `/api/login` (público)
  - [x] POST `/api/logout` (protegido)
  - [x] GET `/api/user` (protegido)

#### Testes
- [x] Criar `tests/Feature/Auth/RegisterTest.php`
  - [x] Testar registro com sucesso
  - [x] Testar registro com email duplicado
  - [x] Testar registro com senha fraca
- [x] Criar `tests/Feature/Auth/LoginTest.php`
  - [x] Testar login com sucesso
  - [x] Testar login com credenciais inválidas
  - [x] Testar logout
- [x] Rodar testes: `sail artisan test`

### Frontend

#### Estrutura Base
- [x] Criar pasta `src/app/core/guards`
- [x] Criar pasta `src/app/core/interceptors`
- [x] Criar pasta `src/app/core/services`
- [x] Criar pasta `src/app/core/models`
- [x] Criar pasta `src/app/features/auth/components/login`
- [x] Criar pasta `src/app/features/auth/components/register`

#### Models/Interfaces
- [x] Criar `core/models/user.model.ts`
  ```typescript
  export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
  }
  ```
- [x] Criar `core/models/auth.model.ts`
  ```typescript
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  ```

#### Services
- [x] Criar `core/services/token.service.ts`
  - [x] Método `setToken(token: string)`
  - [x] Método `getToken(): string | null`
  - [x] Método `removeToken()`
  - [x] Método `isAuthenticated(): boolean`
- [x] Criar `core/services/auth.service.ts`
  - [x] Método `register(data: RegisterRequest): Observable<AuthResponse>`
  - [x] Método `login(data: LoginRequest): Observable<AuthResponse>`
  - [x] Método `logout(): Observable<void>`
  - [x] Método `getCurrentUser(): Observable<User>`

#### Guards
- [x] Criar `core/guards/auth.guard.ts`
  - [x] Verificar se usuário está autenticado
  - [x] Redirecionar para /login se não estiver
- [x] Criar `core/guards/no-auth.guard.ts`
  - [x] Verificar se usuário NÃO está autenticado
  - [x] Redirecionar para /dashboard se estiver

#### Interceptors
- [x] Criar `core/interceptors/auth.interceptor.ts`
  - [x] Adicionar token no header `Authorization: Bearer {token}`
  - [x] Aplicar em todas as requisições
- [x] Criar `core/interceptors/error.interceptor.ts`
  - [x] Capturar erro 401 (não autorizado)
  - [x] Fazer logout automático
  - [x] Redirecionar para /login

#### Components
- [x] Criar `LoginComponent`
  - [x] Template HTML com formulário
  - [x] Campos: email, password
  - [x] Botão de submit
  - [x] Link para registro
  - [x] Validação de formulário
  - [x] Chamar `authService.login()`
  - [x] Armazenar token
  - [x] Redirecionar para /dashboard
- [x] Criar `RegisterComponent`
  - [x] Template HTML com formulário
  - [x] Campos: name, email, password, password_confirmation
  - [x] Botão de submit
  - [x] Link para login
  - [x] Validação de formulário
  - [x] Chamar `authService.register()`
  - [x] Armazenar token
  - [x] Redirecionar para /dashboard

#### Rotas
- [x] Configurar rotas em `app.routes.ts`
  - [x] `/login` → LoginComponent (NoAuthGuard)
  - [x] `/register` → RegisterComponent (NoAuthGuard)
  - [x] `/dashboard` → DashboardComponent (AuthGuard)
  - [x] Rota padrão: redirecionar para /dashboard

#### Configuração
- [x] Registrar interceptors em `app.config.ts`
- [x] Configurar HttpClient
- [x] Configurar provideRouter

### Integração e Testes

- [ ] Testar registro de novo usuário
- [ ] Testar login com usuário criado
- [ ] Verificar se token é armazenado
- [ ] Verificar se token é enviado nas requisições
- [ ] Testar acesso a rota protegida
- [ ] Testar logout
- [ ] Testar redirecionamento após logout
- [ ] Testar erro 401 (token inválido)

### Documentação

- [ ] Documentar endpoints da API (Postman/Swagger)
- [ ] Atualizar README.md com instruções de autenticação
- [ ] Adicionar exemplos de uso

### Commit

- [ ] Fazer commit: `git commit -m "feat: implementa autenticação completa com Sanctum"`

---

## 🎨 Sprint 2: Layout Base e Navegação

### Backend
- [ ] Nenhuma alteração necessária

### Frontend

#### Estrutura
- [ ] Criar pasta `src/app/layout/components/main-layout`
- [ ] Criar pasta `src/app/layout/components/sidebar`
- [ ] Criar pasta `src/app/layout/components/header`
- [ ] Criar pasta `src/app/layout/components/footer`

#### Components
- [ ] Criar `MainLayoutComponent`
  - [ ] Template com sidebar + header + router-outlet + footer
  - [ ] Responsivo
- [ ] Criar `SidebarComponent`
  - [ ] Menu de navegação
  - [ ] Expansível ao hover
  - [ ] Submenu para "Finanças"
  - [ ] Ícones do Material
  - [ ] Item ativo destacado
  - [ ] Animações suaves
- [ ] Criar `HeaderComponent`
  - [ ] Nome do usuário
  - [ ] Avatar
  - [ ] Menu dropdown (perfil, configurações, sair)
  - [ ] Botão de toggle sidebar (mobile)
- [ ] Criar `FooterComponent`
  - [ ] Copyright
  - [ ] Versão do sistema

#### Sidebar - Menu
- [ ] Item: Dashboard (/)
- [ ] Item: Finanças (expansível)
  - [ ] Subitem: Novo Registro (/financas/novo)
  - [ ] Subitem: Previsão (/financas/previsao)
  - [ ] Subitem: Categorias (/financas/categorias)
  - [ ] Subitem: Histórico (/financas/historico)
- [ ] Item: Relatórios (/relatorios)
- [ ] Item: Configurações (/configuracoes)
- [ ] Item: Perfil (/perfil)
- [ ] Item: Sair (logout)

#### Estilos
- [ ] Criar `_variables.scss` com cores e espaçamentos
- [ ] Criar `_mixins.scss` com mixins úteis
- [ ] Criar `_themes.scss` com tema claro/escuro
- [ ] Estilizar sidebar
- [ ] Estilizar header
- [ ] Estilizar footer
- [ ] Adicionar responsividade

#### Rotas
- [ ] Atualizar rotas para usar MainLayoutComponent
- [ ] Configurar lazy loading

### Testes
- [ ] Testar navegação entre páginas
- [ ] Testar expansão do menu
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Testar logout pelo menu

### Commit
- [ ] Fazer commit: `git commit -m "feat: adiciona layout base com sidebar expansível"`

---

## 🔔 Sprint 3: Sistema de Feedback

### Frontend

#### Services
- [ ] Criar `core/services/toast.service.ts`
  - [ ] Método `success(message: string)`
  - [ ] Método `error(message: string)`
  - [ ] Método `warning(message: string)`
  - [ ] Método `info(message: string)`
- [ ] Criar `core/services/loading.service.ts`
  - [ ] Método `show()`
  - [ ] Método `hide()`
  - [ ] Observable `isLoading$`

#### Interceptors
- [ ] Criar `core/interceptors/loading.interceptor.ts`
  - [ ] Mostrar loading ao iniciar requisição
  - [ ] Esconder loading ao finalizar requisição
  - [ ] Contar requisições simultâneas
- [ ] Atualizar `error.interceptor.ts`
  - [ ] Exibir toast de erro automaticamente
  - [ ] Tratar diferentes códigos de erro (400, 401, 403, 404, 500)

#### Components
- [ ] Criar `shared/components/loading-spinner`
  - [ ] Spinner global (fullscreen)
  - [ ] Usar MatProgressSpinner
  - [ ] Mostrar/esconder baseado em `loadingService.isLoading$`

#### Integração
- [ ] Adicionar LoadingSpinnerComponent no AppComponent
- [ ] Configurar MatSnackBar para toasts
- [ ] Testar toasts em ações (login, registro, etc)
- [ ] Testar loading em requisições

### Testes
- [ ] Testar exibição de toast de sucesso
- [ ] Testar exibição de toast de erro
- [ ] Testar loading durante requisição
- [ ] Testar múltiplas requisições simultâneas

### Commit
- [ ] Fazer commit: `git commit -m "feat: adiciona sistema de feedback com toasts e loading"`

---

## 🏷️ Sprint 4: CRUD de Categorias

### Backend

#### Migration
- [ ] Criar migration `create_categories_table`
  - [ ] Campos: id, user_id, name, icon, color, type (income/expense)
  - [ ] Foreign key: user_id → users.id
  - [ ] Timestamps
- [ ] Rodar migration

#### Model
- [ ] Criar `Category.php`
  - [ ] Fillable: name, icon, color, type, user_id
  - [ ] Relationship: belongsTo(User)
  - [ ] Scope: byUser()

#### Controller
- [ ] Criar `CategoryController.php`
  - [ ] Método `index()` - listar categorias do usuário
  - [ ] Método `store()` - criar categoria
  - [ ] Método `show($id)` - detalhes da categoria
  - [ ] Método `update($id)` - atualizar categoria
  - [ ] Método `destroy($id)` - deletar categoria

#### Request
- [ ] Criar `CategoryRequest.php`
  - [ ] Validar: name (required, string, max:100)
  - [ ] Validar: icon (nullable, string)
  - [ ] Validar: color (nullable, string, regex:#[0-9A-F]{6})
  - [ ] Validar: type (required, in:income,expense)

#### Resource
- [ ] Criar `CategoryResource.php`
  - [ ] Retornar: id, name, icon, color, type, created_at

#### Seeder
- [ ] Criar `CategorySeeder.php`
  - [ ] Categorias de receita (Salário, Freelance, etc)
  - [ ] Categorias de despesa (Moradia, Alimentação, etc)

#### Rotas
- [ ] Adicionar em `routes/api.php`
  - [ ] GET `/api/categories` (listar)
  - [ ] POST `/api/categories` (criar)
  - [ ] GET `/api/categories/{id}` (detalhes)
  - [ ] PUT `/api/categories/{id}` (atualizar)
  - [ ] DELETE `/api/categories/{id}` (deletar)

#### Testes
- [ ] Criar `tests/Feature/CategoryTest.php`
  - [ ] Testar listagem
  - [ ] Testar criação
  - [ ] Testar atualização
  - [ ] Testar exclusão
  - [ ] Testar validações

### Frontend

#### Model
- [ ] Criar `features/categories/models/category.model.ts`
  ```typescript
  export interface Category {
    id: number;
    name: string;
    icon?: string;
    color?: string;
    type: 'income' | 'expense';
    created_at: string;
  }
  ```

#### Service
- [ ] Criar `features/categories/services/category.service.ts`
  - [ ] Método `getAll(): Observable<Category[]>`
  - [ ] Método `getById(id: number): Observable<Category>`
  - [ ] Método `create(data: Partial<Category>): Observable<Category>`
  - [ ] Método `update(id: number, data: Partial<Category>): Observable<Category>`
  - [ ] Método `delete(id: number): Observable<void>`

#### Components
- [ ] Criar `CategoryListComponent`
  - [ ] Listar categorias em cards
  - [ ] Filtrar por tipo (receita/despesa)
  - [ ] Botão "Nova Categoria"
  - [ ] Ações: editar, excluir
- [ ] Criar `CategoryFormComponent`
  - [ ] Formulário reativo
  - [ ] Campos: name, icon, color, type
  - [ ] Validações
  - [ ] Modo: criar/editar
  - [ ] Salvar categoria
- [ ] Criar `CategoryCardComponent`
  - [ ] Exibir categoria visualmente
  - [ ] Mostrar ícone e cor
  - [ ] Botões de ação

#### Rotas
- [ ] Adicionar em `features/categories/categories.routes.ts`
  - [ ] `/categorias` → CategoryListComponent
  - [ ] `/categorias/nova` → CategoryFormComponent
  - [ ] `/categorias/:id/editar` → CategoryFormComponent

### Testes
- [ ] Testar listagem de categorias
- [ ] Testar criação de categoria
- [ ] Testar edição de categoria
- [ ] Testar exclusão de categoria
- [ ] Testar validações do formulário

### Commit
- [ ] Fazer commit: `git commit -m "feat: implementa CRUD completo de categorias"`

---

## 💸 Sprint 5: Lançamentos Financeiros

### Backend

#### Migration
- [ ] Criar migration `create_transactions_table`
  - [ ] Campos: id, user_id, category_id, type, amount, description, date
  - [ ] Foreign keys
  - [ ] Timestamps
- [ ] Rodar migration

#### Model
- [ ] Criar `Transaction.php`
  - [ ] Fillable
  - [ ] Relationships
  - [ ] Scopes

#### Controller
- [ ] Criar `TransactionController.php`
  - [ ] CRUD completo
  - [ ] Filtros (data, categoria, tipo)
  - [ ] Paginação

#### Request
- [ ] Criar `TransactionRequest.php`
  - [ ] Validações

#### Resource
- [ ] Criar `TransactionResource.php`
  - [ ] Serialização

#### Rotas
- [ ] Adicionar rotas em `api.php`

#### Testes
- [ ] Criar testes

### Frontend

#### Model
- [ ] Criar `transaction.model.ts`

#### Service
- [ ] Criar `transaction.service.ts`
  - [ ] CRUD completo
  - [ ] Filtros

#### Components
- [ ] Criar `TransactionListComponent`
- [ ] Criar `TransactionFormComponent` (multi-step)
- [ ] Criar `TransactionCardComponent`
- [ ] Criar `TransactionFiltersComponent`

#### Rotas
- [ ] Configurar rotas

### Testes
- [ ] Testar CRUD
- [ ] Testar filtros
- [ ] Testar multi-step form

### Commit
- [ ] Fazer commit: `git commit -m "feat: implementa lançamentos financeiros com multi-step form"`

---

## 📊 Sprint 6: Dashboard Inicial

### Backend

#### Controller
- [ ] Criar `DashboardController.php`
  - [ ] Método `index()` - estatísticas gerais
  - [ ] Método `charts()` - dados para gráficos

#### Service
- [ ] Criar `DashboardService.php`
  - [ ] Calcular saldo total
  - [ ] Calcular receitas do mês
  - [ ] Calcular despesas do mês
  - [ ] Calcular economia do mês
  - [ ] Agrupar gastos por categoria
  - [ ] Evolução mensal

#### Rotas
- [ ] Adicionar rotas

#### Testes
- [ ] Criar testes

### Frontend

#### Service
- [ ] Criar `dashboard.service.ts`

#### Components
- [ ] Criar `DashboardComponent`
- [ ] Criar `BalanceCardComponent`
- [ ] Criar `ChartExpensesComponent` (gráfico pizza)
- [ ] Criar `ChartEvolutionComponent` (gráfico linha)
- [ ] Criar `RecentTransactionsComponent`

#### Integração
- [ ] Integrar com Chart.js ou ng2-charts
- [ ] Criar cards de resumo
- [ ] Criar gráficos

### Testes
- [ ] Testar carregamento de dados
- [ ] Testar exibição de gráficos

### Commit
- [ ] Fazer commit: `git commit -m "feat: implementa dashboard com estatísticas e gráficos"`

---

## 🎉 MVP Completo!

Após completar as 6 sprints, você terá:

- ✅ Autenticação completa
- ✅ Layout profissional
- ✅ Sistema de feedback
- ✅ CRUD de categorias
- ✅ Lançamentos financeiros
- ✅ Dashboard com gráficos

**Parabéns! Você terminou o MVP! 🎊**

---

## 📝 Dicas

### Ao completar cada item:
1. ✅ Marque o checkbox
2. 💾 Faça commit
3. 🧪 Teste
4. 📝 Documente

### Ao completar cada sprint:
1. 🎉 Celebre!
2. 📊 Revise o que foi feito
3. 🐛 Corrija bugs encontrados
4. 📚 Atualize documentação
5. ⏭️ Planeje próxima sprint

### Lembre-se:
- 🐢 Devagar e sempre
- 🎯 Uma coisa por vez
- ✅ Terminar é melhor que perfeito
- 💪 Você consegue!

---

**Última atualização:** 2025
**Desenvolvedor:** Patrick
**Status:** 🚀 Em desenvolvimento
