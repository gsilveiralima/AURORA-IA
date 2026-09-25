# AURORA-IA

Protótipo de assistente conversacional web construído com **Next.js**, **TypeScript**, **Firebase** e integração server-side com a **OpenAI API**.

> Status: MVP experimental. O projeto ainda precisa de testes automatizados, observabilidade e revisão de dependências antes de uso em produção.

## Funcionalidades

- autenticação baseada em Firebase;
- interface de chat;
- memória resumida por usuário armazenada no Firestore;
- chamada à OpenAI API exclusivamente no servidor;
- páginas de conta, login, preços, privacidade e termos.

## Arquitetura

```text
Browser
  │
  ├─ Next.js App Router
  │    ├─ UI
  │    └─ /api/chat
  │          ├─ Firebase Admin → valida token
  │          ├─ Firestore → recupera memória
  │          └─ OpenAI API → gera resposta
  │
  └─ Firebase Authentication
```

## Requisitos

- Node.js 18 ou superior;
- projeto Firebase configurado;
- chave de API da OpenAI.

## Instalação

```bash
npm install
npm run dev
```

A aplicação ficará disponível, por padrão, em:

```text
http://localhost:3000
```

## Variáveis de ambiente

Crie um arquivo `.env.local` somente na máquina de desenvolvimento. Não versione credenciais.

Exemplo de nomes esperados:

```env
OPENAI_API_KEY=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

Os nomes efetivamente utilizados devem ser conferidos nos módulos de configuração Firebase do projeto.

## Validação

```bash
npm run check
npm run build
```

## Segurança

- chaves privadas e tokens não devem ser enviados ao navegador;
- `OPENAI_API_KEY` deve permanecer apenas no backend;
- tokens Firebase são verificados pelo Firebase Admin antes do acesso à memória;
- arquivos `.env*`, credenciais e artefatos locais estão excluídos pelo `.gitignore`;
- antes de produção, adicionar rate limiting, logs estruturados, tratamento de abuso e política de retenção de dados.

## Roadmap

- [ ] testes unitários e de integração;
- [ ] tratamento padronizado de erros da API;
- [ ] rate limiting;
- [ ] observabilidade;
- [ ] política explícita de retenção/exclusão da memória;
- [ ] revisão e atualização controlada das dependências;
- [ ] CI para `npm run check` e `npm run build`.

## Aviso

Este repositório representa um protótipo técnico e não deve ser tratado como serviço de produção sem revisão adicional de segurança, privacidade, custos e disponibilidade.
