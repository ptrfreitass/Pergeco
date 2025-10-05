# 🧪 Teste do Auth Interceptor

## Objetivo
Verificar se o `authInterceptor` está adicionando o header `Authorization: Bearer {token}` nas requisições HTTP.

---

## 📋 Passo a Passo

### 1. Faça Login
1. Acesse `http://localhost:4200/login`
2. Faça login com suas credenciais
3. Você será redirecionado para o dashboard

### 2. Abra o DevTools
1. Pressione `F12` para abrir o DevTools
2. Vá para a aba **Network** (Rede)
3. Marque a opção **Preserve log** (Preservar log)

### 3. Verifique o Token no LocalStorage
1. Vá para a aba **Application** (Aplicação)
2. No menu lateral, expanda **Local Storage**
3. Clique em `http://localhost:4200`
4. Verifique se existe uma chave `auth_token` com um valor (token JWT)

**Exemplo:**
```
Key: auth_token
Value: 1|abcdefghijklmnopqrstuvwxyz1234567890
```

### 4. Teste uma Requisição Autenticada

#### Opção A: Recarregar a Página
1. Com o DevTools aberto na aba **Network**
2. Recarregue a página (`F5` ou `Ctrl+R`)
3. Procure pela requisição `me` (GET `/api/auth/me`)
4. Clique nela
5. Vá para a aba **Headers** (Cabeçalhos)
6. Role até **Request Headers** (Cabeçalhos da Requisição)
7. Procure por `Authorization: Bearer {seu_token}`

#### Opção B: Fazer Logout e Login Novamente
1. Clique em "Sair"
2. Faça login novamente
3. Na aba **Network**, procure pela requisição `login` (POST `/api/auth/login`)
4. Depois, procure pela requisição `me` (GET `/api/auth/me`)
5. Verifique os headers da requisição `me`

#### Opção C: Usar o Console do Navegador
1. Vá para a aba **Console**
2. Execute o seguinte código:

```javascript
// Verificar se o token existe
console.log('Token:', localStorage.getItem('auth_token'));

// Fazer uma requisição manual para testar o interceptor
fetch('/api/auth/me', {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));
```

**IMPORTANTE:** O código acima usa `fetch` nativo, que **NÃO** passa pelos interceptors do Angular. Para testar corretamente, você precisa usar o `HttpClient` do Angular.

---

## 🔍 O que Verificar

### Na aba Network (Rede)

Procure por requisições para `/api/auth/me` ou qualquer outra rota protegida.

**Request Headers esperados:**
```
Accept: application/json
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890
Content-Type: application/json
```

### Possíveis Problemas

#### ❌ Problema 1: Header não aparece
**Causa:** O interceptor pode não estar sendo executado.

**Solução:** Verificar se o interceptor está registrado em `app.config.ts`.

#### ❌ Problema 2: Token não existe no localStorage
**Causa:** O token não foi salvo após o login.

**Solução:** Verificar o `AuthService` e garantir que `tokenService.setToken()` está sendo chamado.

#### ❌ Problema 3: Requisição não passa pelo interceptor
**Causa:** Requisições feitas com `fetch` nativo não passam pelos interceptors do Angular.

**Solução:** Usar sempre o `HttpClient` do Angular para fazer requisições.

---

## 🧪 Teste Adicional: Criar um Botão de Teste

Vamos adicionar um botão temporário no dashboard para testar o interceptor:

### 1. Abra o Console do Navegador
### 2. Execute este código:

```javascript
// Injetar o HttpClient manualmente (apenas para teste)
// NOTA: Isso só funciona se você estiver na página do Angular

// Alternativa: Adicionar um botão no dashboard.component.ts
```

---

## ✅ Resultado Esperado

Quando você fizer login e o Angular carregar os dados do usuário (requisição para `/api/auth/me`), você deve ver:

**Request Headers:**
```
GET /api/auth/me HTTP/1.1
Host: localhost
Accept: application/json
Authorization: Bearer 1|abcdefghijklmnopqrstuvwxyz1234567890
Content-Type: application/json
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Seu Nome",
    "email": "seu@email.com",
    "created_at": "2025-01-04T23:00:00.000000Z",
    "updated_at": "2025-01-04T23:00:00.000000Z"
  }
}
```

---

## 🐛 Debug Adicional

Se o header ainda não aparecer, vamos adicionar logs no interceptor:

### Modificar o `auth.interceptor.ts` temporariamente:

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();

  console.log('🔒 Auth Interceptor executado');
  console.log('📍 URL:', req.url);
  console.log('🎫 Token:', token ? 'Existe' : 'Não existe');

  if (token) {
    console.log('✅ Adicionando header Authorization');
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.log('❌ Token não encontrado, header não adicionado');
  }

  return next(req);
};
```

Depois de adicionar os logs, recarregue a página e verifique o console.

---

## 📝 Checklist de Verificação

- [ ] Token existe no localStorage (`auth_token`)
- [ ] Interceptor está registrado em `app.config.ts`
- [ ] Requisição para `/api/auth/me` é feita após o login
- [ ] Header `Authorization` aparece na aba Network
- [ ] Valor do header é `Bearer {token}`
- [ ] Backend responde com sucesso (200 OK)

---

## 🎯 Próximos Passos

Se tudo estiver funcionando:
- ✅ O interceptor está adicionando o header corretamente
- ✅ O backend está validando o token
- ✅ A autenticação está completa

Se ainda houver problemas, me avise qual é o comportamento exato que você está observando!
