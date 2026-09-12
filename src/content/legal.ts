export const legalPages = {
  privacy: {
    slug: "privacidade",
    href: "/privacidade",
    published: false,
    seo: {
      title: "Privacidade",
      description:
        "Política de privacidade da AZ Work Center. Texto vigente após aprovação jurídica.",
    },
    headings: [
      "Quem controla os dados",
      "Quais dados podem ser tratados",
      "Para que os dados são usados",
      "Base aplicável",
      "Operadores e terceiros",
      "Retenção",
      "Direitos do titular",
      "Canal de contato",
      "Alterações desta política",
    ],
  },
  cookies: {
    slug: "cookies",
    href: "/cookies",
    published: false,
    seo: {
      title: "Cookies",
      description:
        "Informações sobre cookies da AZ Work Center. Texto vigente após aprovação jurídica.",
    },
    headings: [
      "O que são cookies",
      "Cookies essenciais",
      "Analytics",
      "Marketing",
      "Como gerir preferências",
      "Como reabrir as escolhas",
    ],
  },
} as const;

export function isLegalPagePublished(page: { published: boolean }): boolean {
  return page.published;
}
