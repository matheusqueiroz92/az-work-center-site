# Checklist externo — Resend e Vercel

Não executar nesta passagem de código. Não colar chave, captura de painel com segredo ou valor real de DNS inventado. Os registros DNS devem ser copiados do painel do Resend no momento da configuração.

Destinatários aprovados para os escopos (não hardcoded no app):

- Production: `contato@azworkcenter.com.br`
- Preview/teste: `matheusqueiroz@azworkcenter.com.br`
- Remetente desejado: `AZ Work Center <site@azworkcenter.com.br>`

## Passos

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
15. Confirmar recebimento, `replyTo`, SPF, DKIM e ausência de duplicidade.
16. Testar Production somente após autorização explícita.
17. Avaliar regra de rate limit no Vercel Firewall sem bloquear navegação legítima. Só aplicar se o plano e o endpoint gerado pela Server Action permitirem; não inventar regra nesta passagem.
18. Registrar procedimento de rotação/revogação da chave.
19. Nunca colar a chave no chat, commit, documentação, captura ou saída de terminal.

## Ainda não concluído

- Domínio/remetente no Resend (antes da verificação real).
- DNS (antes da validação real).
- Variáveis da Vercel (antes de configuradas).
- Envio Preview/Production (antes dos testes reais).
- Política jurídica/Analytics da Fatia C.
