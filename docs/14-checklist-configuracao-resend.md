# Checklist externo — Resend e Vercel

Não colar chave, captura de painel com segredo ou valor real de DNS inventado neste repositório. Destinatários aprovados para os escopos (não hardcoded no app):

- Production: `contato@azworkcenter.com.br`
- Preview/teste: `matheusqueiroz@azworkcenter.com.br`
- Remetente desejado: `AZ Work Center <site@azworkcenter.com.br>`

## Verificado

1. Projeto e team corretos na Vercel; equipe do projeto no plano **Pro**.
2. Domínio `azworkcenter.com.br` consta como **Verified** no Resend.
3. Os **três registros DNS exigidos** pelo painel Resend foram adicionados (sem registrar aqui os valores completos).
4. As quatro variáveis de contato (`CONTACT_PROVIDER`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`) estão configuradas **somente no escopo Preview**.
5. Um envio de teste em Preview concluiu com sucesso e o e-mail chegou a `matheusqueiroz@azworkcenter.com.br`.

Não há, nesta lista, evidência registrada de inspeção por mensagem de `replyTo`, SPF ou DKIM no cliente de e-mail; o passo de autenticação por mensagem permanece a confirmar quando for feito.

## Ainda aberto

- Variáveis de contato no escopo **Production** (e Development, se necessário além do `disabled` local).
- Teste de envio em **Production** (somente após autorização explícita).
- Destinatário de Production `contato@azworkcenter.com.br` operacional no escopo Production.
- Avaliação e aplicação de rate limit no **Vercel Firewall** (se o plano e o endpoint da Server Action permitirem).
- Procedimento documentado de **rotação/revogação** da chave Resend.
- Política jurídica / cookies / Analytics (Fatia C).
- Nunca colar a chave no chat, commit, documentação, captura ou saída de terminal.

## Passos de referência (histórico)

1. Confirmar projeto e escopo/team corretos na Vercel.
2. Provisionar/conectar Resend pelo Marketplace ou conta Resend aprovada.
3. Adicionar `azworkcenter.com.br` no Resend.
4. Copiar exatamente os registros DNS fornecidos pelo painel.
5. Antes de alterar DNS, inventariar MX/SPF/DKIM existentes para não interromper o e-mail corporativo.
6. Não criar segundo SPF incompatível; combinar/autenticar conforme orientação do provedor atual e do Resend.
7. Não alterar A/CNAME do site ou registros da aplicação `estrutura.azworkcenter.com.br`.
8. Aguardar o painel Resend confirmar domínio/remetente.
9. Configurar `RESEND_API_KEY` como segredo server-side nos escopos necessários.
10. Configurar `CONTACT_PROVIDER`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` separadamente em Development, Preview e Production.
11. Production: destinatário `contato@azworkcenter.com.br`.
12. Preview: destinatário `matheusqueiroz@azworkcenter.com.br`.
13. Development: provider `disabled` por padrão.
14. Testar primeiro Preview com um lead sintético sem dados reais.
15. Confirmar recebimento; validar `replyTo`/SPF/DKIM por mensagem quando houver evidência própria; ausência de duplicidade.
16. Testar Production somente após autorização explícita.
17. Avaliar regra de rate limit no Vercel Firewall sem bloquear navegação legítima.
18. Registrar procedimento de rotação/revogação da chave.
19. Nunca colar a chave no chat, commit, documentação, captura ou saída de terminal.
