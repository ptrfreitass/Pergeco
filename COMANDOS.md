# 🛠️ Comandos Úteis - Pergeco

Referência rápida de comandos para desenvolvimento do projeto Pergeco.

---

## 🐳 Docker (Laravel Sail)

### Iniciar containers
```bash
cd Backend
./vendor/bin/sail up -d
```

### Parar containers
```bash
./vendor/bin/sail down
```

### Ver logs
```bash
./vendor/bin/sail logs
```

### Acessar container
```bash
./vendor/bin/sail shell
```

### Criar alias (recomendado)
```bash
alias sail='./vendor/bin/sail'
```

Depois use apenas:
```bash
sail up -d
sail down
sail shell
```

---

## 🔧 Laravel (Backend)

### Instalação
```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
```

### Migrations
```bash
# Rodar migrations
sail artisan migrate

# Criar nova migration
sail artisan make:migration create_nome_table

# Rollback última migration
sail artisan migrate:rollback

# Resetar banco (CUIDADO!)
sail artisan migrate:fresh

# Resetar e rodar seeders
sail artisan migrate:fresh --seed
```

### Seeders
```bash
# Rodar todos os seeders
sail artisan db:seed

# Rodar seeder específico
sail artisan db:seed --class=CategorySeeder

# Criar novo seeder
sail artisan make:seeder NomeSeeder
```

### Controllers
```bash
# Criar controller
sail artisan make:controller NomeController

# Criar controller com resource methods
sail artisan make:controller NomeController --resource

# Criar controller API
sail artisan make:controller Api/NomeController --api
```

### Models
```bash
# Criar model
sail artisan make:model Nome

# Criar model com migration
sail artisan make:model Nome -m

# Criar model com migration, factory e seeder
sail artisan make:model Nome -mfs
```

### Requests (Validação)
```bash
# Criar form request
sail artisan make:request NomeRequest
```

### Resources (Serialização)
```bash
# Criar resource
sail artisan make:resource NomeResource

# Criar resource collection
sail artisan make:resource NomeCollection
```

### Middleware
```bash
# Criar middleware
sail artisan make:middleware NomeMiddleware
```

### Cache
```bash
# Limpar cache
sail artisan cache:clear

# Limpar config cache
sail artisan config:clear

# Limpar route cache
sail artisan route:clear

# Limpar view cache
sail artisan view:clear

# Limpar tudo
sail artisan optimize:clear
```

### Rotas
```bash
# Listar todas as rotas
sail artisan route:list

# Listar rotas da API
sail artisan route:list --path=api
```

### Testes
```bash
# Rodar todos os testes
sail artisan test

# Rodar testes específicos
sail artisan test --filter=NomeDoTeste

# Rodar com cobertura
sail artisan test --coverage

# Criar teste
sail artisan make:test NomeTest
```

### Tinker (Console interativo)
```bash
sail artisan tinker
```

### Queue (Filas)
```bash
# Processar filas
sail artisan queue:work

# Criar job
sail artisan make:job NomeJob
```

---

## 🎨 Angular (Frontend)

### Instalação
```bash
cd Frontend
npm install
```

### Desenvolvimento
```bash
# Iniciar servidor
npm start
# ou
ng serve

# Iniciar com proxy
ng serve --proxy-config proxy.conf.json

# Iniciar em porta específica
ng serve --port 4300

# Abrir automaticamente no navegador
ng serve --open
```

### Build
```bash
# Build de desenvolvimento
npm run build
# ou
ng build

# Build de produção
ng build --configuration production

# Build com análise de bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/frontend/stats.json
```

### Componentes
```bash
# Criar component
ng generate component nome
# ou
ng g c nome

# Criar component standalone
ng g c nome --standalone

# Criar component em pasta específica
ng g c features/auth/components/login
```

### Services
```bash
# Criar service
ng generate service nome
# ou
ng g s nome

# Criar service em pasta específica
ng g s core/services/auth
```

### Guards
```bash
# Criar guard
ng generate guard nome
# ou
ng g g nome

# Criar guard em pasta específica
ng g g core/guards/auth
```

### Interceptors
```bash
# Criar interceptor
ng generate interceptor nome
# ou
ng g interceptor nome

# Criar interceptor em pasta específica
ng g interceptor core/interceptors/auth
```

### Pipes
```bash
# Criar pipe
ng generate pipe nome
# ou
ng g p nome

# Criar pipe em pasta específica
ng g p shared/pipes/currency-brl
```

### Directives
```bash
# Criar directive
ng generate directive nome
# ou
ng g d nome
```

### Models/Interfaces
```bash
# Criar interface
ng generate interface nome
# ou
ng g i nome

# Criar interface em pasta específica
ng g i core/models/user
```

### Testes
```bash
# Rodar testes
npm test
# ou
ng test

# Rodar testes com cobertura
ng test --code-coverage

# Rodar testes em modo headless
ng test --watch=false --browsers=ChromeHeadless
```

### Lint
```bash
# Verificar código
ng lint

# Corrigir automaticamente
ng lint --fix
```

### Atualizar Angular
```bash
# Ver atualizações disponíveis
ng update

# Atualizar Angular CLI
ng update @angular/cli

# Atualizar Angular Core
ng update @angular/core

# Atualizar Angular Material
ng update @angular/material
```

---

## 📦 NPM/Composer

### NPM (Frontend)
```bash
# Instalar dependências
npm install

# Instalar dependência específica
npm install nome-pacote

# Instalar dependência de desenvolvimento
npm install nome-pacote --save-dev

# Remover dependência
npm uninstall nome-pacote

# Atualizar dependências
npm update

# Verificar dependências desatualizadas
npm outdated

# Limpar cache
npm cache clean --force
```

### Composer (Backend)
```bash
# Instalar dependências
composer install

# Instalar dependência específica
composer require nome/pacote

# Instalar dependência de desenvolvimento
composer require nome/pacote --dev

# Remover dependência
composer remove nome/pacote

# Atualizar dependências
composer update

# Verificar dependências desatualizadas
composer outdated

# Limpar cache
composer clear-cache

# Dump autoload
composer dump-autoload
```

---

## 🗄️ PostgreSQL

### Acessar banco via Sail
```bash
sail psql
```

### Comandos SQL úteis
```sql
-- Listar databases
\l

-- Conectar a database
\c pergeco

-- Listar tabelas
\dt

-- Descrever tabela
\d nome_tabela

-- Ver dados de tabela
SELECT * FROM nome_tabela;

-- Sair
\q
```

---

## 🔍 Git

### Básico
```bash
# Ver status
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "mensagem"

# Push
git push

# Pull
git pull
```

### Branches
```bash
# Criar branch
git checkout -b feature/nome

# Mudar de branch
git checkout nome-branch

# Listar branches
git branch

# Deletar branch
git branch -d nome-branch

# Merge
git merge nome-branch
```

### Histórico
```bash
# Ver histórico
git log

# Ver histórico resumido
git log --oneline

# Ver diferenças
git diff
```

### Desfazer
```bash
# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Desfazer último commit (descarta alterações)
git reset --hard HEAD~1

# Descartar alterações de arquivo
git checkout -- nome-arquivo
```

---

## 🧹 Limpeza

### Backend
```bash
cd Backend

# Limpar todos os caches
sail artisan optimize:clear

# Limpar vendor
rm -rf vendor
composer install

# Limpar node_modules (se houver)
rm -rf node_modules
npm install
```

### Frontend
```bash
cd Frontend

# Limpar node_modules
rm -rf node_modules
npm install

# Limpar cache do Angular
rm -rf .angular

# Limpar dist
rm -rf dist
```

---

## 🚀 Deploy

### Backend (Produção)
```bash
# Otimizar autoload
composer install --optimize-autoloader --no-dev

# Cache de configuração
php artisan config:cache

# Cache de rotas
php artisan route:cache

# Cache de views
php artisan view:cache

# Rodar migrations
php artisan migrate --force
```

### Frontend (Produção)
```bash
# Build de produção
ng build --configuration production

# Arquivos estarão em dist/frontend/
```

---

## 📊 Monitoramento

### Laravel Telescope
```bash
# Instalar
sail composer require laravel/telescope --dev

# Publicar assets
sail artisan telescope:install

# Rodar migrations
sail artisan migrate

# Acessar: http://localhost/telescope
```

### Laravel Debugbar
```bash
# Instalar
sail composer require barryvdh/laravel-debugbar --dev
```

---

## 🔧 Troubleshooting

### Permissões (Linux/Mac)
```bash
cd Backend
sudo chmod -R 777 storage bootstrap/cache
```

### Recriar containers Docker
```bash
sail down -v
sail up -d
```

### Limpar tudo e recomeçar
```bash
# Backend
cd Backend
sail down -v
rm -rf vendor
composer install
cp .env.example .env
php artisan key:generate
sail up -d
sail artisan migrate:fresh --seed

# Frontend
cd Frontend
rm -rf node_modules .angular dist
npm install
npm start
```

---

## 📝 Atalhos Úteis

### Criar alias permanente (Linux/Mac)
```bash
# Adicionar ao ~/.bashrc ou ~/.zshrc
echo "alias sail='./vendor/bin/sail'" >> ~/.bashrc
source ~/.bashrc
```

### Script de setup rápido
```bash
# Backend
cd Backend && composer install && cp .env.example .env && php artisan key:generate && sail up -d && sail artisan migrate:fresh --seed

# Frontend
cd Frontend && npm install && npm start
```

---

## 🎯 Comandos por Tarefa

### Começar o dia
```bash
# Terminal 1 - Backend
cd Backend
sail up -d

# Terminal 2 - Frontend
cd Frontend
npm start
```

### Terminar o dia
```bash
# Backend
cd Backend
sail down

# Frontend
Ctrl + C (no terminal do Angular)
```

### Resetar banco de dados
```bash
cd Backend
sail artisan migrate:fresh --seed
```

### Criar nova feature
```bash
# Backend
sail artisan make:controller Api/NomeController --api
sail artisan make:model Nome -mfs
sail artisan make:request NomeRequest
sail artisan make:resource NomeResource

# Frontend
ng g c features/nome/components/nome-list
ng g c features/nome/components/nome-form
ng g s features/nome/services/nome
ng g i features/nome/models/nome
```

---

**Última atualização:** 2025
**Desenvolvedor:** Patrick

💡 **Dica:** Salve este arquivo nos favoritos para consulta rápida!
