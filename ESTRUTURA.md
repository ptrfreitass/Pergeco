# 📁 Estrutura de Pastas - Pergeco

## 🎯 Estrutura Geral do Monorepo

```
pergeco/
├── Backend/                 # API Laravel
├── Frontend/                # SPA Angular
├── docs/                    # Documentação adicional
├── ROADMAP.md              # Roadmap de desenvolvimento
├── ESTRUTURA.md            # Este arquivo
└── README.md               # Documentação principal
```

---

## 🔧 Backend (Laravel)

```
Backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── CategoryController.php
│   │   │   │   ├── TransactionController.php
│   │   │   │   └── DashboardController.php
│   │   │   └── Controller.php
│   │   ├── Middleware/
│   │   │   └── Authenticate.php
│   │   ├── Requests/
│   │   │   ├── Auth/
│   │   │   │   ├── RegisterRequest.php
│   │   │   │   └── LoginRequest.php
│   │   │   ├── CategoryRequest.php
│   │   │   └── TransactionRequest.php
│   │   └── Resources/
│   │       ├── UserResource.php
│   │       ├── CategoryResource.php
│   │       └── TransactionResource.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Category.php
│   │   └── Transaction.php
│   ├── Services/              # Lógica de negócio
│   │   ├── AuthService.php
│   │   ├── CategoryService.php
│   │   ├── TransactionService.php
│   │   └── DashboardService.php
│   └── Providers/
│       └── AppServiceProvider.php
├── bootstrap/
│   ├── app.php
│   └── providers.php
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── cors.php               # Configuração CORS
│   ├── database.php
│   └── sanctum.php            # Configuração Sanctum
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   ├── CategoryFactory.php
│   │   └── TransactionFactory.php
│   ├── migrations/
│   │   ├── 2024_01_01_000000_create_users_table.php
│   │   ├── 2024_01_02_000000_create_categories_table.php
│   │   └── 2024_01_03_000000_create_transactions_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       └── CategorySeeder.php
├── routes/
│   ├── api.php                # Rotas da API
│   └── web.php
├── tests/
│   ├── Feature/
│   │   ├── Auth/
│   │   │   ├── RegisterTest.php
│   │   │   └── LoginTest.php
│   │   ├── CategoryTest.php
│   │   └── TransactionTest.php
│   └── Unit/
├── .env.example               # Variáveis de ambiente
├── artisan
├── composer.json
├── docker-compose.yml         # Docker Sail
├── phpunit.xml
└── README.md
```

---

## 🎨 Frontend (Angular)

```
Frontend/
├── src/
│   ├── app/
│   │   ├── core/                      # Módulo Core (singleton)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── no-auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── loading.interceptor.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── token.service.ts
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── toast.service.ts
│   │   │   │   └── loading.service.ts
│   │   │   └── models/
│   │   │       ├── user.model.ts
│   │   │       ├── auth.model.ts
│   │   │       └── api-response.model.ts
│   │   │
│   │   ├── shared/                    # Módulo Shared (reutilizável)
│   │   │   ├── components/
│   │   │   │   ├── loading-spinner/
│   │   │   │   │   ├── loading-spinner.component.ts
│   │   │   │   │   ├── loading-spinner.component.html
│   │   │   │   │   └── loading-spinner.component.scss
│   │   │   │   ├── confirm-dialog/
│   │   │   │   └── empty-state/
│   │   │   ├── pipes/
│   │   │   │   ├── currency-brl.pipe.ts
│   │   │   │   └── date-br.pipe.ts
│   │   │   └── directives/
│   │   │       └── click-outside.directive.ts
│   │   │
│   │   ├── features/                  # Módulos de Features
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── login.component.ts
│   │   │   │   │   │   ├── login.component.html
│   │   │   │   │   │   └── login.component.scss
│   │   │   │   │   └── register/
│   │   │   │   │       ├── register.component.ts
│   │   │   │   │       ├── register.component.html
│   │   │   │   │       └── register.component.scss
│   │   │   │   └── auth.routes.ts
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── balance-card/
│   │   │   │   │   ├── chart-expenses/
│   │   │   │   │   └── recent-transactions/
│   │   │   │   ├── services/
│   │   │   │   │   └── dashboard.service.ts
│   │   │   │   └── dashboard.routes.ts
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   ├── components/
│   │   │   │   │   ├── category-list/
│   │   │   │   │   ├── category-form/
│   │   │   │   │   └── category-card/
│   │   │   │   ├── services/
│   │   │   │   │   └── category.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── category.model.ts
│   │   │   │   └── categories.routes.ts
│   │   │   │
│   │   │   └── transactions/
│   │   │       ├── components/
│   │   │       │   ├── transaction-list/
│   │   │       │   ├── transaction-form/
│   │   │       │   ├── transaction-card/
│   │   │       │   └── transaction-filters/
│   │   │       ├── services/
│   │   │       │   └── transaction.service.ts
│   │   │       ├── models/
│   │   │       │   └── transaction.model.ts
│   │   │       └── transactions.routes.ts
│   │   │
│   │   ├── layout/                    # Layout da aplicação
│   │   │   ├── components/
│   │   │   │   ├── main-layout/
│   │   │   │   │   ├── main-layout.component.ts
│   │   │   │   │   ├── main-layout.component.html
│   │   │   │   │   └── main-layout.component.scss
│   │   │   │   ├── sidebar/
│   │   │   │   │   ├── sidebar.component.ts
│   │   │   │   │   ├── sidebar.component.html
│   │   │   │   │   └── sidebar.component.scss
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   └── header.component.scss
│   │   │   │   └── footer/
│   │   │   └── layout.routes.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   │
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _reset.scss
│   │   └── _themes.scss
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── public/
│   └── favicon.ico
│
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── README.md
```

---

## 📋 Convenções de Nomenclatura

### Backend (Laravel)
- **Controllers:** PascalCase + `Controller` → `CategoryController.php`
- **Models:** PascalCase singular → `Category.php`
- **Requests:** PascalCase + `Request` → `CategoryRequest.php`
- **Resources:** PascalCase + `Resource` → `CategoryResource.php`
- **Services:** PascalCase + `Service` → `CategoryService.php`
- **Migrations:** snake_case → `create_categories_table.php`
- **Rotas API:** kebab-case → `/api/categories`

### Frontend (Angular)
- **Components:** kebab-case → `category-list.component.ts`
- **Services:** kebab-case + `.service` → `category.service.ts`
- **Guards:** kebab-case + `.guard` → `auth.guard.ts`
- **Interceptors:** kebab-case + `.interceptor` → `auth.interceptor.ts`
- **Models:** kebab-case + `.model` → `category.model.ts`
- **Pipes:** kebab-case + `.pipe` → `currency-brl.pipe.ts`
- **Rotas:** kebab-case → `/categorias`

---

## 🎯 Arquitetura

### Backend - Camadas
1. **Routes** → Define endpoints
2. **Controllers** → Recebe requisições
3. **Requests** → Valida dados
4. **Services** → Lógica de negócio
5. **Models** → Acesso ao banco
6. **Resources** → Serializa resposta

### Frontend - Arquitetura Modular
1. **Core Module** → Serviços singleton (auth, api, etc)
2. **Shared Module** → Componentes reutilizáveis
3. **Feature Modules** → Funcionalidades específicas
4. **Layout Module** → Estrutura visual

### Fluxo de Dados
```
Frontend → HTTP Request → Backend
Backend → Valida → Processa → Responde
Frontend → Recebe → Atualiza UI
```

---

## 🔒 Segurança

### Backend
- ✅ Validação de dados (Requests)
- ✅ Autenticação (Sanctum)
- ✅ Autorização (Policies)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL Injection (Eloquent ORM)

### Frontend
- ✅ Guards (proteção de rotas)
- ✅ Interceptors (token automático)
- ✅ Sanitização de inputs
- ✅ HTTPS only (produção)

---

**Última atualização:** 2025
**Desenvolvedor:** Patrick
