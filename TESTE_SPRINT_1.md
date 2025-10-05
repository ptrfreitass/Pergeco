# 🧪 Guia de Teste - Sprint 1

## Como testar a autenticação completa

---

## 🚀 Passo 1: Iniciar o Backend

```bash
cd Backend

# Se for a primeira vez
composer install
cp .env.example .env
php artisan key:generate

# Iniciar Docker
./vendor/bin/sail up -d

# Rodar migrations
./vendor/bin/sail artisan migrate

# Verificar se está rodando
curl http://localhost/api/ping
# Deve retornar: {"message":"pong","timestamp":"...","status":"ok"}
```

---

## 🎨 Passo 2: Iniciar o Frontend

```bash
cd Frontend

# Se for a primeira vez
npm install

# Iniciar servidor de desenvolvimento
npm start

# Aguarde até ver:
# ✔ Browser application bundle generation complete.
# ✔ Built at: ...
# ** Angular Live Development Server is listening on localhost:4200 **
```

---

## ✅ Passo 3: Testar Registro

1. **Abra o navegador:** http://localhost:4200

2. **Você será redirecionado para:** http://localhost:4200/login
   - Isso é o `authGuard` funcionando!

3. **Clique em:** "Cadastre-se"

4. **Preencha o formulário:**
   - Nome: `Patrick`
   - E-mail: `patrick@pergeco.com`
   - Senha: `12345678`
   - Confirmar senha: `12345678`

5. **Clique em:** "Criar conta"

6. **Resultado esperado:**
   - ✅ Você deve ser redirecionado para `/dashboard`
   - ✅ Deve ver: "Bem-vindo, Patrick! 👋"
   - ✅ Deve ver seu e-mail
   - ✅ Deve ver: "✅ Autenticação funcionando perfeitamente!"

7. **Verifique o localStorage:**
   - Abra DevTools (F12)
   - Vá em Application → Local Storage → http://localhost:4200
   - Deve ter uma chave `auth_token` com um valor longo

---

## 🔓 Passo 4: Testar Logout

1. **No dashboard, clique em:** "Sair"

2. **Resultado esperado:**
   - ✅ Você deve ser redirecionado para `/login`
   - ✅ O token deve ser removido do localStorage

3. **Verifique o localStorage:**
   - Não deve mais ter a chave `auth_token`

---

## 🔐 Passo 5: Testar Login

1. **Na tela de login, preencha:**
   - E-mail: `patrick@pergeco.com`
   - Senha: `12345678`

2. **Clique em:** "Entrar"

3. **Resultado esperado:**
   - ✅ Você deve ser redirecionado para `/dashboard`
   - ✅ Deve ver novamente seus dados
   - ✅ Token deve estar no localStorage

---

## 🛡️ Passo 6: Testar Proteção de Rotas

### Teste 1: Acessar rota protegida sem autenticação

1. **Faça logout** (se estiver logado)

2. **Tente acessar diretamente:** http://localhost:4200/dashboard

3. **Resultado esperado:**
   - ✅ Você deve ser redirecionado para `/login`
   - ✅ Isso é o `authGuard` funcionando!

### Teste 2: Acessar rota de login estando autenticado

1. **Faça login**

2. **Tente acessar:** http://localhost:4200/login

3. **Resultado esperado:**
   - ✅ Você deve ser redirecionado para `/dashboard`
   - ✅ Isso é o `noAuthGuard` funcionando!

---

## 🔍 Passo 7: Testar Validações

### Teste de Login

1. **Acesse:** http://localhost:4200/login

2. **Teste 1: Campos vazios**
   - Clique em "Entrar" sem preencher nada
   - ✅ Deve mostrar: "E-mail é obrigatório" e "Senha é obrigatória"

3. **Teste 2: E-mail inválido**
   - Digite: `teste` (sem @)
   - ✅ Deve mostrar: "E-mail inválido"

4. **Teste 3: Senha curta**
   - Digite senha com menos de 8 caracteres
   - ✅ Deve mostrar: "Senha deve ter no mínimo 8 caracteres"

5. **Teste 4: Credenciais incorretas**
   - E-mail: `errado@email.com`
   - Senha: `senhaerrada`
   - ✅ Deve mostrar: "E-mail ou senha incorretos."

### Teste de Registro

1. **Acesse:** http://localhost:4200/register

2. **Teste 1: Senhas não conferem**
   - Senha: `12345678`
   - Confirmar senha: `87654321`
   - ✅ Deve mostrar: "As senhas não conferem"

3. **Teste 2: E-mail duplicado**
   - Use o mesmo e-mail já cadastrado
   - ✅ Deve mostrar: "Este e-mail já está cadastrado."

4. **Teste 3: Nome muito curto**
   - Digite apenas 2 caracteres
   - ✅ Deve mostrar: "Nome deve ter no mínimo 3 caracteres"

---

## 🔧 Passo 8: Testar Interceptors

### Teste do authInterceptor

1. **Faça login**

2. **Abra DevTools (F12) → Network**

3. **Recarregue a página**

4. **Clique na requisição:** `me` (GET /api/auth/me)

5. **Vá em Headers → Request Headers**

6. **Verifique:**
   - ✅ Deve ter: `Authorization: Bearer {seu_token}`
   - ✅ Isso é o `authInterceptor` funcionando!

### Teste do errorInterceptor

1. **Faça login**

2. **Abra DevTools (F12) → Application → Local Storage**

3. **Edite o token:** Mude alguns caracteres

4. **Recarregue a página**

5. **Resultado esperado:**
   - ✅ Você deve ser redirecionado para `/login`
   - ✅ Token deve ser removido
   - ✅ Isso é o `errorInterceptor` tratando o erro 401!

---

## 📊 Checklist de Testes

### Funcionalidades Básicas
- [x] Registro de novo usuário funciona
- [x] Login com usuário existente funciona
- [x] Logout funciona
- [x] Token é salvo no localStorage
- [x] Token é removido no logout

### Guards
- [x] authGuard bloqueia acesso sem autenticação
- [x] authGuard redireciona para /login
- [x] noAuthGuard bloqueia acesso com autenticação
- [x] noAuthGuard redireciona para /dashboard

### Interceptors
- [x] authInterceptor adiciona token nas requisições
- [x] errorInterceptor trata erro 401
- [x] errorInterceptor remove token inválido
- [x] errorInterceptor redireciona para /login

### Validações
- [x] Validação de e-mail funciona
- [x] Validação de senha funciona
- [x] Validação de confirmação de senha funciona
- [x] Mensagens de erro aparecem
- [x] Campos obrigatórios são validados

### UI/UX
- [x] Loading aparece durante requisições
- [x] Mensagens de erro são claras
- [x] Botões ficam desabilitados durante loading
- [x] Design é responsivo (teste em mobile)
- [x] Links de navegação funcionam

---

## 🐛 Problemas Comuns

### Backend não inicia
```bash
# Verificar se Docker está rodando
docker ps

# Reiniciar containers
cd Backend
./vendor/bin/sail down
./vendor/bin/sail up -d
```

### Frontend não inicia
```bash
# Limpar node_modules
cd Frontend
rm -rf node_modules
npm install
npm start
```

### Erro de CORS
```bash
# Verificar se proxy está configurado
cat Frontend/proxy.conf.json

# Deve ter:
# {
#   "/api": {
#     "target": "http://localhost",
#     "secure": false
#   }
# }
```

### Token não é enviado
```bash
# Verificar se interceptor está registrado
cat Frontend/src/app/app.config.ts

# Deve ter:
# withInterceptors([authInterceptor, errorInterceptor])
```

### Erro 401 constante
```bash
# Limpar localStorage
# DevTools → Application → Local Storage → Clear All

# Fazer login novamente
```

---

## 🎯 Resultado Final

Se todos os testes passaram, você tem:

- ✅ Autenticação completa funcionando
- ✅ Backend e Frontend integrados
- ✅ Guards protegendo rotas
- ✅ Interceptors gerenciando tokens
- ✅ Validações funcionando
- ✅ UI/UX profissional

**Parabéns! Sprint 1 está completa! 🎉**

---

## 📸 Screenshots Esperados

### Tela de Login
- Formulário com e-mail e senha
- Link para registro
- Botão "Entrar"
- Validações em vermelho (quando erro)

### Tela de Registro
- Formulário com nome, e-mail, senha e confirmação
- Link para login
- Botão "Criar conta"
- Validações em vermelho (quando erro)

### Dashboard
- Mensagem de boas-vindas com nome do usuário
- E-mail do usuário
- Botão "Sair"
- Mensagem de sucesso da Sprint 1

---

## 🔄 Próximos Passos

Após validar que tudo está funcionando:

1. ✅ Marque a Sprint 1 como concluída no CHECKLIST.md
2. ✅ Faça commit das alterações
3. ✅ Leia o SPRINT_1_CONCLUIDA.md
4. ⏳ Comece a Sprint 2 (Layout e Navegação)

---

**Boa sorte nos testes! 🚀**
