# 💰 Pergeco - Sistema de Gestão Financeira Pessoal

> Sistema completo de controle financeiro pessoal com foco em UX, gamificação e inteligência financeira.

[![Laravel](https://img.shields.io/badge/Laravel-12.0-red.svg)](https://laravel.com)
[![Angular](https://img.shields.io/badge/Angular-20.0-red.svg)](https://angular.io)
[![PHP](https://img.shields.io/badge/PHP-8.2+-blue.svg)](https://php.net)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue.svg)](https://www.postgresql.org)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**Pergeco** é um sistema de gestão financeira pessoal moderno e intuitivo, desenvolvido para ajudar pessoas a organizarem suas finanças de forma simples e eficiente.

### Diferenciais

- 🎮 **Gamificação**: Badges, streaks e desafios financeiros
- 🤖 **Inteligência**: Análises comportamentais e sugestões personalizadas
- 📊 **Relatórios**: Visualizações gráficas e insights financeiros
- 📱 **Responsivo**: Interface adaptada para todos os dispositivos
- 🔒 **Seguro**: Autenticação robusta com Laravel Sanctum
- ⚡ **Rápido**: Performance otimizada com lazy loading

---

## 🚀 Tecnologias

### Backend
- **Laravel 12** - Framework PHP moderno
- **PHP 8.2+** - Linguagem de programação
- **PostgreSQL 17** - Banco de dados relacional
- **Laravel Sanctum** - Autenticação API
- **Pest PHP** - Framework de testes

### Frontend
- **Angular 20** - Framework JavaScript
- **TypeScript 5.8** - Superset do JavaScript
- **Angular Material** - Componentes UI
- **Bootstrap 5** - Framework CSS
- **RxJS** - Programação reativa
- **Jasmine/Karma** - Framework de testes

### DevOps
- **Docker** - Containerização
- **Laravel Sail** - Ambiente de desenvolvimento
- **Git** - Controle de versão

---

## ✨ Funcionalidades

### Fase 1 - MVP (Em Desenvolvimento)
- [x] Autenticação (Login/Registro)
- [ ] Dashboard inicial
- [ ] CRUD de Categorias
- [ ] Cadastro de Receitas
- [ ] Cadastro de Despesas
- [ ] Listagem de transações
- [ ] Filtros por data e categoria
- [ ] Relatórios básicos

### Fase 2 - UX/UI
- [ ] Sidebar expansível
- [ ] Tema claro/escuro
- [ ] Animações e microinterações
- [ ] Formulários multi-step
- [ ] Sistema de toasts/alertas
- [ ] Loading states

### Fase 3 - Inteligência
- [ ] Barra de saúde financeira
- [ ] Alertas de comportamento
- [ ] Análise de gastos por prioridade
- [ ] Resumos mensais automáticos
- [ ] Estimativas futuras
- [ ] Sugestões de metas

### Fase 4 - Engajamento
- [ ] Sistema de badges
- [ ] Desafios financeiros
- [ ] Streak de consistência
- [ ] Comparativo mês a mês
- [ ] Notificações web push

### Fase 5 - Integrações
- [ ] Importação de extrato CSV
- [ ] Open Finance (futuro)
- [ ] Google Calendar
- [ ] Detecção de padrões

### Fase 6 - Mobile
- [ ] PWA
- [ ] Build Android (Capacitor)
- [ ] Publicação Google Play
- [ ] Sincronização offline

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (recomendado)
- [Git](https://git-scm.com)
- [Node.js 18+](https://nodejs.org) e npm
- [Composer](https://getcomposer.org) (se não usar Docker)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pergeco.git
cd pergeco
```

### 2. Backend (Laravel)

```bash
cd Backend

# Copiar arquivo de ambiente
cp .env.example .env

# Instalar dependências
composer install

# Gerar chave da aplicação
php artisan key:generate

# Subir containers Docker
./vendor/bin/sail up -d

# Rodar migrations
./vendor/bin/sail artisan migrate

# Rodar seeders (categorias padrão)
./vendor/bin/sail artisan db:seed
```

**Acesse:** http://localhost

### 3. Frontend (Angular)

```bash
cd Frontend

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm start
```

**Acesse:** http://localhost:4200

---

## 📁 Estrutura do Projeto

```
pergeco/
├── Backend/           # API Laravel
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── tests/
├── Frontend/          # SPA Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── shared/
│   │   │   ├── features/
│   │   │   └── layout/
│   │   └── assets/
│   └── public/
├── docs/              # Documentação
├── ROADMAP.md         # Roadmap detalhado
├── ESTRUTURA.md       # Estrutura de pastas
└── README.md          # Este arquivo
```

📖 **Documentação completa:** Veja [ESTRUTURA.md](ESTRUTURA.md)

---

## 🗺️ Roadmap

O projeto está dividido em **sprints** de desenvolvimento:

- ✅ **Sprint 0**: Setup inicial e configuração
- 🔄 **Sprint 1**: Autenticação completa
- ⏳ **Sprint 2**: Layout base e navegação
- ⏳ **Sprint 3**: Sistema de feedback
- ⏳ **Sprint 4**: CRUD de categorias
- ⏳ **Sprint 5**: Lançamentos financeiros
- ⏳ **Sprint 6**: Dashboard inicial

📖 **Roadmap completo:** Veja [ROADMAP.md](ROADMAP.md)

---

## 🧪 Testes

### Backend (Pest PHP)

```bash
cd Backend
./vendor/bin/sail artisan test
```

### Frontend (Jasmine/Karma)

```bash
cd Frontend
npm test
```

---

## 📚 Documentação da API

A documentação da API estará disponível em:

- **Desenvolvimento:** http://localhost/api/documentation
- **Postman Collection:** `docs/postman/`

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Patrick**

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [Seu Nome](https://linkedin.com/in/seu-perfil)

---

## 🙏 Agradecimentos

- [Laravel](https://laravel.com)
- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
- [Bootstrap](https://getbootstrap.com)

---

<div align="center">
  <p>Feito com ❤️ por Patrick</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>
