# Segurança

AURORA-IA é um protótipo e não deve receber dados sensíveis ou ser tratado como serviço de produção.

## Credenciais

- `OPENAI_API_KEY` é somente server-side.
- `FIREBASE_SERVICE_ACCOUNT_KEY` é segredo e nunca deve ser enviado ao cliente.
- Variáveis `NEXT_PUBLIC_*` são, por definição, expostas ao navegador e não podem conter segredos.

## Dados

A coleção de memória do Firestore deve conter apenas o mínimo necessário. Antes de produção, implemente retenção, exclusão pelo usuário, rate limiting e logs sem conteúdo sensível.

## Reporte

Não publique tokens, service accounts, conteúdo de memória ou outros dados privados em issues. Use um canal privado com o mantenedor para detalhes exploráveis.
