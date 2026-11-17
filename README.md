# D.C$ Game Store — projeto inicial

Este projeto é um protótipo PWA: pode ser instalado como aplicativo no Android pelo navegador.

## O que já funciona nesta primeira versão
- Visual moderno adaptável ao celular.
- Saldo D.C$ e histórico de movimentações.
- Catálogo demonstrativo com preços S–D.
- Compra de jogos e biblioteca.
- Limite de dois jogos ativos.
- Dados salvos localmente no navegador deste aparelho.

## Importante
Esta versão inicial ainda não sincroniza entre aparelhos e não executa a renovação automática. O app precisa ser publicado em HTTPS para instalação. A pasta `supabase/` contém a base inicial para a próxima etapa: banco de dados e função de renovação mensal. Não coloque chaves secretas no `app.js`.

## Como testar no computador
Abra a pasta com um servidor local (por exemplo, a extensão Live Server do VS Code). Service workers e instalação PWA exigem HTTPS ou localhost.

## Como publicar gratuitamente
1. Crie uma conta no GitHub.
2. Crie um repositório chamado `dc-game-store`.
3. Envie todos os arquivos desta pasta para o repositório.
4. Em Settings > Pages, ative GitHub Pages usando a branch `main` e a pasta `/root`.
5. Abra o endereço HTTPS gerado no Chrome do Android.
6. No menu do Chrome, escolha “Adicionar à tela inicial” ou “Instalar app”.

## Próxima etapa: renovação mensal real
1. Crie um projeto no Supabase.
2. Abra SQL Editor e execute `supabase/schema.sql`.
3. Cadastre os jogos na tabela `games`.
4. Publique a Edge Function `monthly-renew`.
5. Configure um agendamento mensal no Supabase para chamar a função no dia 1.
6. Depois conectaremos o aplicativo às tabelas com autenticação e operações seguras.

## Preços configurados
S = 1.000 D.C$; A = 800 D.C$; B = 550 D.C$; C = 300 D.C$; D = 100 D.C$.

## Limites
O limite de dois jogos ativos está aplicado no protótipo do navegador. Antes de usar com dados reais e múltiplos aparelhos, a validação deve ser movida para o banco/servidor.
