# ===================================
# 🚀 Script de Configuração Git - Pergeco
# ===================================

Write-Host "🎯 Configurando Git e GitHub para o projeto Pergeco..." -ForegroundColor Cyan
Write-Host ""

# ===================================
# 1. Verificar se Git está instalado
# ===================================
Write-Host "📋 Verificando instalação do Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git instalado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não está instalado!" -ForegroundColor Red
    Write-Host "   Baixe em: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# ===================================
# 2. Verificar se já existe repositório
# ===================================
Write-Host "📋 Verificando repositório Git existente..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "⚠️  Repositório Git já existe!" -ForegroundColor Yellow
    $response = Read-Host "   Deseja remover e recomeçar do zero? (S/N)"
    
    if ($response -eq "S" -or $response -eq "s") {
        Write-Host "🗑️  Removendo repositório existente..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force .git
        Write-Host "✅ Repositório removido!" -ForegroundColor Green
    } else {
        Write-Host "❌ Operação cancelada." -ForegroundColor Red
        exit 0
    }
} else {
    Write-Host "✅ Nenhum repositório Git encontrado." -ForegroundColor Green
}
Write-Host ""

# ===================================
# 3. Configurar usuário Git
# ===================================
Write-Host "📋 Configurando usuário Git..." -ForegroundColor Yellow
$userName = git config --global user.name
$userEmail = git config --global user.email

if ([string]::IsNullOrEmpty($userName)) {
    $userName = Read-Host "   Digite seu nome"
    git config --global user.name "$userName"
}

if ([string]::IsNullOrEmpty($userEmail)) {
    $userEmail = Read-Host "   Digite seu email"
    git config --global user.email "$userEmail"
}

Write-Host "✅ Usuário configurado:" -ForegroundColor Green
Write-Host "   Nome: $userName" -ForegroundColor Cyan
Write-Host "   Email: $userEmail" -ForegroundColor Cyan
Write-Host ""

# ===================================
# 4. Configurar branch padrão
# ===================================
Write-Host "📋 Configurando branch padrão como 'main'..." -ForegroundColor Yellow
git config --global init.defaultBranch main
Write-Host "✅ Branch padrão configurada!" -ForegroundColor Green
Write-Host ""

# ===================================
# 5. Inicializar repositório
# ===================================
Write-Host "📋 Inicializando repositório Git..." -ForegroundColor Yellow
git init
Write-Host "✅ Repositório inicializado!" -ForegroundColor Green
Write-Host ""

# ===================================
# 6. Adicionar arquivos
# ===================================
Write-Host "📋 Adicionando arquivos ao repositório..." -ForegroundColor Yellow
git add .
Write-Host "✅ Arquivos adicionados!" -ForegroundColor Green
Write-Host ""

# ===================================
# 7. Fazer commit inicial
# ===================================
Write-Host "📋 Fazendo commit inicial..." -ForegroundColor Yellow
$commitMessage = @"
🎉 Initial commit - Sprint 0 e Sprint 1 completas

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
- GIT_GITHUB_SETUP.md: Guia de configuração Git/GitHub

🔧 Tecnologias:
- Backend: Laravel 12, PHP 8.2+, PostgreSQL 17
- Frontend: Angular 20, TypeScript 5.8
- Autenticação: Laravel Sanctum
- Containerização: Docker + Laravel Sail
"@

git commit -m "$commitMessage"
Write-Host "✅ Commit inicial criado!" -ForegroundColor Green
Write-Host ""

# ===================================
# 8. Criar tags
# ===================================
Write-Host "📋 Criando tags para as sprints..." -ForegroundColor Yellow

# Tag Sprint 0
git tag -a v0.1.0 -m "🏗️ Sprint 0: Configuração do Projeto

✅ Estrutura de pastas criada
✅ Ambiente de desenvolvimento configurado
✅ Documentação completa
✅ Docker e Laravel Sail configurados
✅ PostgreSQL configurado"

# Tag Sprint 1
git tag -a v1.0.0 -m "🔐 Sprint 1: Autenticação Completa

✅ Backend com Laravel Sanctum
✅ Frontend com Angular 20
✅ Login e Registro funcionando
✅ Guards e Interceptors implementados
✅ Validações de formulário
✅ Melhorias de UX/UI
✅ Migração para sintaxe @if do Angular 20"

Write-Host "✅ Tags criadas: v0.1.0 e v1.0.0" -ForegroundColor Green
Write-Host ""

# ===================================
# 9. Configurar remote (GitHub)
# ===================================
Write-Host "📋 Configurando conexão com GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Antes de continuar, crie um repositório no GitHub!" -ForegroundColor Yellow
Write-Host "   1. Acesse: https://github.com/new" -ForegroundColor Cyan
Write-Host "   2. Nome do repositório: pergeco (ou outro nome)" -ForegroundColor Cyan
Write-Host "   3. NÃO inicialize com README, .gitignore ou license" -ForegroundColor Cyan
Write-Host "   4. Clique em 'Create repository'" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "Você já criou o repositório no GitHub? (S/N)"

if ($response -eq "S" -or $response -eq "s") {
    Write-Host ""
    $repoUrl = Read-Host "Digite a URL do repositório (ex: https://github.com/usuario/pergeco.git)"
    
    try {
        git remote add origin $repoUrl
        Write-Host "✅ Remote configurado!" -ForegroundColor Green
        Write-Host ""
        
        # ===================================
        # 10. Push para GitHub
        # ===================================
        Write-Host "📋 Enviando código para o GitHub..." -ForegroundColor Yellow
        git push -u origin main
        Write-Host "✅ Código enviado para a branch main!" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "📋 Enviando tags para o GitHub..." -ForegroundColor Yellow
        git push origin --tags
        Write-Host "✅ Tags enviadas!" -ForegroundColor Green
        Write-Host ""
        
        Write-Host "🎉 SUCESSO! Repositório configurado e código enviado!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Resumo:" -ForegroundColor Cyan
        Write-Host "   ✅ Repositório Git inicializado" -ForegroundColor Green
        Write-Host "   ✅ Commit inicial criado" -ForegroundColor Green
        Write-Host "   ✅ Tags criadas (v0.1.0 e v1.0.0)" -ForegroundColor Green
        Write-Host "   ✅ Código enviado para o GitHub" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔗 Acesse seu repositório em:" -ForegroundColor Cyan
        Write-Host "   $repoUrl" -ForegroundColor Yellow
        
    } catch {
        Write-Host "❌ Erro ao configurar remote ou fazer push!" -ForegroundColor Red
        Write-Host "   Erro: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Tente manualmente:" -ForegroundColor Yellow
        Write-Host "   git remote add origin $repoUrl" -ForegroundColor Cyan
        Write-Host "   git push -u origin main" -ForegroundColor Cyan
        Write-Host "   git push origin --tags" -ForegroundColor Cyan
    }
} else {
    Write-Host ""
    Write-Host "✅ Repositório local configurado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Resumo:" -ForegroundColor Cyan
    Write-Host "   ✅ Repositório Git inicializado" -ForegroundColor Green
    Write-Host "   ✅ Commit inicial criado" -ForegroundColor Green
    Write-Host "   ✅ Tags criadas (v0.1.0 e v1.0.0)" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Crie um repositório no GitHub" -ForegroundColor Cyan
    Write-Host "   2. Execute os comandos:" -ForegroundColor Cyan
    Write-Host "      git remote add origin https://github.com/usuario/pergeco.git" -ForegroundColor White
    Write-Host "      git push -u origin main" -ForegroundColor White
    Write-Host "      git push origin --tags" -ForegroundColor White
}

Write-Host ""
Write-Host "📚 Para mais informações, consulte: GIT_GITHUB_SETUP.md" -ForegroundColor Cyan
Write-Host ""
