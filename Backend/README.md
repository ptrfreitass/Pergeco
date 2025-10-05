# 🔧 Backend - Pergeco API

> API RESTful desenvolvida em Laravel 12 para o sistema Pergeco

[![Laravel](https://img.shields.io/badge/Laravel-12.0-red.svg)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-blue.svg)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue.svg)](https://www.postgresql.org)

---

## 📋 Índice

- [Sobre](#-sobre)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Testes](#-testes)
- [Estrutura](#-estrutura)
- [API Endpoints](#-api-endpoints)

---

## 🎯 Sobre

API RESTful que fornece todos os endpoints necessários para o sistema de gestão financeira Pergeco.

### Funcionalidades

- 🔐 Autenticação com Laravel Sanctum
- 👤 Gerenciamento de usuários
- 🏷️ CRUD de categorias
- 💰 CRUD de transações financeiras
- 📊 Dashboard com estatísticas
- 📈 Relatórios financeiros
- 🔍 Filtros e buscas avançadas

---

## 🚀 Tecnologias

- **Laravel 12** - Framework PHP
- **PHP 8.2+** - Linguagem
- **PostgreSQL 17** - Banco de dados
- **Laravel Sanctum** - Autenticação API
- **Pest PHP** - Testes
- **Laravel Sail** - Ambiente Docker

---

## 📦 Pré-requisitos

### Opção 1: Docker (Recomendado)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com)

### Opção 2: Local
- PHP 8.2 ou superior
- Composer
- PostgreSQL 17
- Extensões PHP: pdo, pdo_pgsql, mbstring, openssl, tokenizer, xml, ctype, json, bcmath

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
cd Backend
```

### 2. Instale as dependências

```bash
composer install
```

### 3. Configure o ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 4. Gere a chave da aplicação

```bash
php artisan key:generate
```

### 5. Suba os containers Docker (Sail)

```bash
./vendor/bin/sail up -d
```

Ou crie um alias:

```bash
alias sail='./vendor/bin/sail'
sail up -d
```

### 6. Execute as migrations

```bash
sail artisan migrate
```

### 7. Execute os seeders (opcional)

```bash
sail artisan db:seed
```

---

## ⚙️ Configuração

### Variáveis de Ambiente Importantes

```env
# Aplicação
APP_NAME=Pergeco
APP_URL=http://localhost
APP_TIMEZONE=America/Sao_Paulo

# Frontend (CORS)
FRONTEND_URL=http://localhost:4200

# Banco de Dados
DB_CONNECTION=pgsql
DB_HOST=pgsql
DB_PORT=5432
DB_DATABASE=pergeco
DB_USERNAME=sail
DB_PASSWORD=password

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:4200
```

### CORS

O CORS está configurado em `config/cors.php` para aceitar requisições do frontend Angular.

### Sanctum

A autenticação via API tokens está configurada em `config/sanctum.php`.

---

## 🎮 Uso

### Iniciar o servidor

```bash
sail up
```

A API estará disponível em: **http://localhost**

### Parar o servidor

```bash
sail down
```

### Acessar o container

```bash
sail shell
```

### Executar comandos Artisan

```bash
sail artisan [comando]
```

### Exemplos de comandos úteis

```bash
# Limpar cache
sail artisan cache:clear

# Criar migration
sail artisan make:migration create_nome_table

# Criar controller
sail artisan make:controller NomeController

# Criar model
sail artisan make:model Nome

# Criar seeder
sail artisan make:seeder NomeSeeder

# Rodar migrations
sail artisan migrate

# Rollback migrations
sail artisan migrate:rollback

# Refresh migrations (cuidado!)
sail artisan migrate:fresh --seed
```

---

## 🧪 Testes

### Executar todos os testes

```bash
sail artisan test
```

### Executar testes específicos

```bash
sail artisan test --filter=NomeDoTeste
```

### Executar com cobertura

```bash
sail artisan test --coverage
```

### Estrutura de Testes

```
tests/
├── Feature/          # Testes de integração
│   ├── Auth/
│   ├── Category/
│   └── Transaction/
└── Unit/             # Testes unitários
```

---

## 📁 Estrutura

```
Backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/              # Controllers da API
│   │   ├── Middleware/           # Middlewares
│   │   ├── Requests/             # Form Requests (validação)
│   │   └── Resources/            # API Resources (serialização)
│   ├── Models/                   # Models Eloquent
│   ├── Services/                 # Lógica de negócio
│   └── Providers/                # Service Providers
├── config/                       # Arquivos de configuração
├── database/
│   ├── factories/                # Factories para testes
│   ├── migrations/               # Migrations
│   └── seeders/                  # Seeders
├── routes/
│   ├── api.php                   # Rotas da API
│   └── web.php                   # Rotas web
├── tests/                        # Testes
├── .env.example                  # Exemplo de variáveis
├── composer.json                 # Dependências PHP
└── docker-compose.yml            # Configuração Docker
```

---

## 🌐 API Endpoints

### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/api/register` | Registrar novo usuário | Não |
| POST | `/api/login` | Login | Não |
| POST | `/api/logout` | Logout | Sim |
| GET | `/api/user` | Dados do usuário autenticado | Sim |

### Categorias

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/categories` | Listar categorias | Sim |
| POST | `/api/categories` | Criar categoria | Sim |
| GET | `/api/categories/{id}` | Detalhes da categoria | Sim |
| PUT | `/api/categories/{id}` | Atualizar categoria | Sim |
| DELETE | `/api/categories/{id}` | Deletar categoria | Sim |

### Transações

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/transactions` | Listar transações | Sim |
| POST | `/api/transactions` | Criar transação | Sim |
| GET | `/api/transactions/{id}` | Detalhes da transação | Sim |
| PUT | `/api/transactions/{id}` | Atualizar transação | Sim |
| DELETE | `/api/transactions/{id}` | Deletar transação | Sim |

### Dashboard

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/api/dashboard` | Estatísticas gerais | Sim |
| GET | `/api/dashboard/charts` | Dados para gráficos | Sim |

---

## 🔐 Autenticação

A API usa **Laravel Sanctum** para autenticação via tokens.

### Fluxo de Autenticação

1. Cliente faz POST para `/api/login` com email e senha
2. API valida credenciais
3. API retorna token de acesso
4. Cliente armazena o token
5. Cliente envia o token no header `Authorization: Bearer {token}` em todas as requisições

### Exemplo de Requisição Autenticada

```bash
curl -X GET http://localhost/api/user \
  -H "Authorization: Bearer {seu-token}" \
  -H "Accept: application/json"
```

---

## 📝 Padrões de Código

### Controllers

- Usar `ApiController` como base
- Métodos RESTful: `index`, `store`, `show`, `update`, `destroy`
- Retornar sempre JSON
- Usar HTTP status codes corretos

### Requests

- Validação centralizada em Form Requests
- Mensagens de erro em português
- Regras de validação claras

### Resources

- Serialização de dados em API Resources
- Controle de campos retornados
- Formatação consistente

### Services

- Lógica de negócio separada dos controllers
- Métodos reutilizáveis
- Fácil de testar

---

## 🐛 Debug

### Laravel Debugbar

```bash
composer require barryvdh/laravel-debugbar --dev
```

### Laravel Telescope

```bash
sail artisan telescope:install
sail artisan migrate
```

Acesse: http://localhost/telescope

---

## 📚 Documentação Adicional

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Pest PHP](https://pestphp.com)
- [PostgreSQL](https://www.postgresql.org/docs)

---

## 🤝 Contribuindo

1. Crie uma branch para sua feature
2. Escreva testes
3. Implemente a feature
4. Garanta que todos os testes passam
5. Faça commit com mensagem descritiva
6. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">
  <p>Desenvolvido com ❤️ por Patrick</p>
</div>
