# 🔄 Guia de Configuração Git e GitHub - Pergeco

## 📋 Índice

1. [Limpeza da Configuração Atual](#1-limpeza-da-configuração-atual)
2. [Configuração Inicial do Git](#2-configuração-inicial-do-git)
3. [Criação do Repositório Local](#3-criação-do-repositório-local)
4. [Primeiro Commit](#4-primeiro-commit)
5. [Criação do Repositório no GitHub](#5-criação-do-repositório-no-github)
6. [Conexão com o GitHub](#6-conexão-com-o-github)
7. [Push do Código](#7-push-do-código)
8. [Criação de Tags](#8-criação-de-tags)
9. [Workflow de Desenvolvimento](#9-workflow-de-desenvolvimento)

---

## 1. Limpeza da Configuração Atual

### Passo 1.1: Verificar se existe repositório Git

```powershell
# Verificar se existe .git
Test-Path .git
```

### Passo 1.2: Remover repositório Git existente (se necessário)

```powershell
# ATENÇÃO: Isso vai apagar todo o histórico Git!
# Só execute se tiver certeza que quer recomeçar do zero

# No PowerShell (Windows)
Remove-Item -Recurse -Force .git

# Ou no Git Bash / Linux / Mac
rm -rf .git
```

### Passo 1.3: Verificar se foi removido

```powershell
Test-Path .git
# Deve retornar: False
```

---

## 2. Configuração Inicial do Git

### Passo 2.1: Configurar nome e email (se ainda não configurou)

```bash
# Configurar globalmente (para todos os projetos)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Ou configurar apenas para este projeto
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

### Passo 2.2: Verificar configuração

```bash
git config --list
```

### Passo 2.3: Configurar branch padrão como 'main'

```bash
git config --global init.defaultBranch main
```

---

## 3. Criação do Repositório Local

### Passo 3.1: Inicializar repositório Git

```bash
# Na raiz do projeto (onde está o .gitignore)
git init
```

**Saída esperada:**
```
Initialized empty Git repository in C:/Projetos/PersonalGeneralControler/.git/
```

### Passo 3.2: Verificar status

```bash
git status
```

**Saída esperada:**
```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        Backend/
        Frontend/
        CHECKLIST.md
        ...
```

---

## 4. Primeiro Commit

### Passo 4.1: Adicionar todos os arquivos

```bash
# Adicionar todos os arquivos (respeitando o .gitignore)
git add .
```

### Passo 4.2: Verificar o que será commitado

```bash
git status
```

**Saída esperada:**
```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   Backend/...
        new file:   Frontend/...
        ...
```

### Passo 4.3: Fazer o primeiro commit

```bash
git commit -m "🎉 Initial commit - Sprint 0 e Sprint 1 completas

✅ Sprint 0: Configuração do Projeto
- Estrutura de pastas Backend (Laravel) e Frontend (Angular)
- Configuração do ambiente de desenvolvimento
- Documentação completa (README, ROADMAP, ESTRUTURA, etc.)
- Docker e Laravel Sail configurados
- PostgreSQL configurado

✅ Sprint 1: Autenticação Completa
- Backend: Laravel Sanctum com endpoints de auth
- Frontend: Angular 20 com componentes de login e registro
- Guards: authGuard e noAuthGuard
- Interceptors: authInterceptor e errorInterceptor
- Validações de formulário
- Melhorias de UX/UI
- Migração para nova sintaxe @if do Angular 20

📚 Documentação:
- INDEX.md: Índice completo da documentação
- ROADMAP.md: Planejamento das 6 sprints
- CHECKLIST.md: Lista de tarefas detalhada
- COMANDOS.md: Comandos úteis
- TESTE_SPRINT_1.md: Guia de testes
- MELHORIAS_UX.md: Documentação das melhorias de UX
- CORRECOES_ANGULAR_20.md: Migração para Angular 20

🔧 Tecnologias:
- Backend: Laravel 12, PHP 8.2+, PostgreSQL 17
- Frontend: Angular 20, TypeScript 5.8
- Autenticação: Laravel Sanctum
- Containerização: Docker + Laravel Sail"
```

### Passo 4.4: Verificar o commit

```bash
git log --oneline
```

**Saída esperada:**
```
abc1234 (HEAD -> main) 🎉 Initial commit - Sprint 0 e Sprint 1 completas
```

---

## 5. Criação do Repositório no GitHub

### Passo 5.1: Acessar o GitHub

1. Acesse [https://github.com](https://github.com)
2. Faça login na sua conta
3. Clique no botão **"+"** no canto superior direito
4. Selecione **"New repository"**

### Passo 5.2: Configurar o repositório

**Configurações recomendadas:**

- **Repository name:** `pergeco` ou `personal-general-controler`
- **Description:** `💰 Sistema de Gestão Financeira Pessoal - Laravel + Angular`
- **Visibility:** 
  - ✅ **Public** (se quiser compartilhar)
  - ✅ **Private** (se quiser manter privado)
- **Initialize this repository with:**
  - ❌ **NÃO** marque "Add a README file"
  - ❌ **NÃO** marque "Add .gitignore"
  - ❌ **NÃO** marque "Choose a license"

**IMPORTANTE:** Não inicialize o repositório com nenhum arquivo, pois já temos tudo localmente!

### Passo 5.3: Criar o repositório

Clique em **"Create repository"**

---

## 6. Conexão com o GitHub

### Passo 6.1: Copiar a URL do repositório

Após criar o repositório, o GitHub mostrará uma página com instruções. Copie a URL do repositório:

**Formato HTTPS:**
```
https://github.com/seu-usuario/pergeco.git
```

**Formato SSH (recomendado se você configurou SSH):**
```
git@github.com:seu-usuario/pergeco.git
```

### Passo 6.2: Adicionar o remote

```bash
# Usando HTTPS
git remote add origin https://github.com/seu-usuario/pergeco.git

# Ou usando SSH
git remote add origin git@github.com:seu-usuario/pergeco.git
```

### Passo 6.3: Verificar o remote

```bash
git remote -v
```

**Saída esperada:**
```
origin  https://github.com/seu-usuario/pergeco.git (fetch)
origin  https://github.com/seu-usuario/pergeco.git (push)
```

---

## 7. Push do Código

### Passo 7.1: Fazer o push inicial

```bash
# Push da branch main para o GitHub
git push -u origin main
```

**Saída esperada:**
```
Enumerating objects: 150, done.
Counting objects: 100% (150/150), done.
Delta compression using up to 8 threads
Compressing objects: 100% (120/120), done.
Writing objects: 100% (150/150), 50.00 KiB | 5.00 MiB/s, done.
Total 150 (delta 30), reused 0 (delta 0), pack-reused 0
To https://github.com/seu-usuario/pergeco.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

### Passo 7.2: Verificar no GitHub

1. Acesse o repositório no GitHub
2. Você deve ver todos os arquivos e pastas
3. O README.md principal deve estar visível

---

## 8. Criação de Tags

### Passo 8.1: Criar tag para Sprint 0

```bash
git tag -a v0.1.0 -m "🏗️ Sprint 0: Configuração do Projeto

✅ Estrutura de pastas criada
✅ Ambiente de desenvolvimento configurado
✅ Documentação completa
✅ Docker e Laravel Sail configurados
✅ PostgreSQL configurado"
```

### Passo 8.2: Criar tag para Sprint 1

```bash
git tag -a v1.0.0 -m "🔐 Sprint 1: Autenticação Completa

✅ Backend com Laravel Sanctum
✅ Frontend com Angular 20
✅ Login e Registro funcionando
✅ Guards e Interceptors implementados
✅ Validações de formulário
✅ Melhorias de UX/UI
✅ Migração para sintaxe @if do Angular 20"
```

### Passo 8.3: Listar tags

```bash
git tag
```

**Saída esperada:**
```
v0.1.0
v1.0.0
```

### Passo 8.4: Fazer push das tags

```bash
# Push de todas as tags
git push origin --tags
```

**Saída esperada:**
```
To https://github.com/seu-usuario/pergeco.git
 * [new tag]         v0.1.0 -> v0.1.0
 * [new tag]         v1.0.0 -> v1.0.0
```

### Passo 8.5: Verificar tags no GitHub

1. Acesse o repositório no GitHub
2. Clique em **"Releases"** ou **"Tags"**
3. Você deve ver as tags `v0.1.0` e `v1.0.0`

---

## 9. Workflow de Desenvolvimento

### 9.1: Workflow para Novas Features

```bash
# 1. Criar uma nova branch para a feature
git checkout -b feature/nome-da-feature

# 2. Fazer alterações no código
# ... editar arquivos ...

# 3. Adicionar arquivos modificados
git add .

# 4. Fazer commit
git commit -m "✨ feat: descrição da feature"

# 5. Fazer push da branch
git push origin feature/nome-da-feature

# 6. Criar Pull Request no GitHub (opcional)
# Ou fazer merge direto na main:
git checkout main
git merge feature/nome-da-feature
git push origin main

# 7. Deletar a branch (opcional)
git branch -d feature/nome-da-feature
git push origin --delete feature/nome-da-feature
```

### 9.2: Workflow para Sprints

```bash
# Ao finalizar uma sprint:

# 1. Fazer commit das alterações
git add .
git commit -m "✅ Sprint X completa: Descrição"

# 2. Criar tag da sprint
git tag -a vX.0.0 -m "Sprint X: Descrição"

# 3. Fazer push
git push origin main
git push origin --tags
```

### 9.3: Convenção de Commits (Conventional Commits)

Use prefixos para organizar os commits:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Formatação, ponto e vírgula, etc.
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Tarefas de manutenção

**Exemplos:**
```bash
git commit -m "feat: adicionar componente de sidebar"
git commit -m "fix: corrigir validação de email"
git commit -m "docs: atualizar README com instruções de instalação"
git commit -m "style: formatar código com prettier"
git commit -m "refactor: extrair lógica de autenticação para service"
git commit -m "test: adicionar testes para AuthService"
git commit -m "chore: atualizar dependências do npm"
```

---

## 10. Comandos Úteis

### Verificar status

```bash
git status
```

### Ver histórico de commits

```bash
# Formato resumido
git log --oneline

# Formato detalhado
git log

# Com gráfico de branches
git log --oneline --graph --all
```

### Ver diferenças

```bash
# Ver alterações não commitadas
git diff

# Ver alterações em um arquivo específico
git diff arquivo.ts
```

### Desfazer alterações

```bash
# Desfazer alterações em um arquivo (antes do add)
git checkout -- arquivo.ts

# Desfazer git add (unstage)
git reset HEAD arquivo.ts

# Desfazer último commit (mantendo alterações)
git reset --soft HEAD~1

# Desfazer último commit (descartando alterações)
git reset --hard HEAD~1
```

### Atualizar do GitHub

```bash
# Baixar alterações do GitHub
git pull origin main
```

### Ver branches

```bash
# Listar branches locais
git branch

# Listar todas as branches (incluindo remotas)
git branch -a
```

---

## 11. Troubleshooting

### Problema: "fatal: remote origin already exists"

**Solução:**
```bash
# Remover o remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/seu-usuario/pergeco.git
```

### Problema: "error: failed to push some refs"

**Solução:**
```bash
# Fazer pull primeiro
git pull origin main --rebase

# Depois fazer push
git push origin main
```

### Problema: Arquivos grandes ou sensíveis foram commitados

**Solução:**
```bash
# Remover arquivo do histórico
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch caminho/do/arquivo" \
  --prune-empty --tag-name-filter cat -- --all

# Fazer push forçado (CUIDADO!)
git push origin --force --all
```

### Problema: Esqueci de adicionar algo no último commit

**Solução:**
```bash
# Adicionar os arquivos esquecidos
git add arquivo-esquecido.ts

# Emendar o último commit
git commit --amend --no-edit

# Ou emendar e editar a mensagem
git commit --amend -m "Nova mensagem"
```

---

## 12. Boas Práticas

### ✅ DO (Faça)

- ✅ Faça commits pequenos e frequentes
- ✅ Use mensagens de commit descritivas
- ✅ Crie branches para features grandes
- ✅ Faça pull antes de push
- ✅ Revise o código antes de commitar
- ✅ Use .gitignore para arquivos sensíveis
- ✅ Crie tags para releases importantes

### ❌ DON'T (Não Faça)

- ❌ Não commite arquivos sensíveis (.env, senhas, etc.)
- ❌ Não commite node_modules ou vendor
- ❌ Não faça commits gigantes com muitas alterações
- ❌ Não use mensagens vagas ("fix", "update", etc.)
- ❌ Não faça push --force sem necessidade
- ❌ Não commite código que não compila
- ❌ Não esqueça de testar antes de commitar

---

## 13. Próximos Passos

Após configurar o Git e GitHub:

1. ✅ Configurar GitHub Actions para CI/CD (opcional)
2. ✅ Configurar branch protection rules (opcional)
3. ✅ Adicionar badges no README (opcional)
4. ✅ Configurar GitHub Projects para gerenciar sprints (opcional)
5. ✅ Começar Sprint 2: Layout com Sidebar

---

## 📚 Recursos Adicionais

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## 🎉 Conclusão

Agora você tem um repositório Git e GitHub configurado corretamente! 🚀

**Estrutura final:**
```
pergeco/
├── .git/                    # Repositório Git local
├── .gitignore              # Arquivos ignorados
├── Backend/                # Laravel API
├── Frontend/               # Angular SPA
├── README.md               # Documentação principal
├── ROADMAP.md              # Planejamento
├── CHECKLIST.md            # Lista de tarefas
└── ... (outros arquivos)
```

**No GitHub:**
- ✅ Repositório criado
- ✅ Código enviado
- ✅ Tags criadas (v0.1.0 e v1.0.0)
- ✅ Histórico de commits organizado

Bom desenvolvimento! 💻✨
