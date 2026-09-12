import { z } from "zod";

const navHrefSchema = z
  .string()
  .min(1)
  .regex(/^\/(?!\/)[a-z0-9\-/]*[a-z0-9]$|^\/$/, "href interno obrigatório")
  .refine(
    (href) => href !== "#" && !href.includes("#"),
    "href não pode ser âncora vazia",
  );

const navItemSchema = z.object({
  label: z.string().trim().min(1),
  href: navHrefSchema,
});

export type NavItem = z.infer<typeof navItemSchema>;

const footerGroupsSchema = z
  .object({
    work: z.array(navItemSchema).min(1),
    company: z.array(navItemSchema).min(1),
    legal: z.array(navItemSchema).min(1),
  })
  .superRefine((groups, context) => {
    const hrefs = [...groups.work, ...groups.company, ...groups.legal].map(
      (item) => item.href,
    );
    const seen = new Set<string>();

    for (const href of hrefs) {
      if (seen.has(href)) {
        context.addIssue({
          code: "custom",
          message: "href duplicado entre os grupos públicos do Footer",
        });
        return;
      }

      seen.add(href);
    }
  });

const navigationSchema = z.object({
  primary: z.array(navItemSchema).min(1),
  footer: footerGroupsSchema,
  cta: navItemSchema,
});

export type FooterNavigation = z.infer<typeof footerGroupsSchema>;
export type Navigation = z.infer<typeof navigationSchema>;

const solucoes = { label: "Soluções", href: "/solucoes" };
const projetos = { label: "Projetos", href: "/projetos" };
const comoTrabalhamos = {
  label: "Como trabalhamos",
  href: "/como-trabalhamos",
};
const sobre = { label: "Sobre", href: "/sobre" };
const contato = { label: "Contato", href: "/contato" };
const privacidade = { label: "Privacidade", href: "/privacidade" };
const cookies = { label: "Cookies", href: "/cookies" };

export const navigation = navigationSchema.parse({
  primary: [solucoes, projetos, comoTrabalhamos, sobre],
  footer: {
    work: [solucoes, projetos],
    company: [comoTrabalhamos, sobre, contato],
    legal: [privacidade, cookies],
  },
  cta: {
    label: "Solicitar diagnóstico",
    href: "/contato",
  },
});

export function listNavigationItems(
  nav: Navigation = navigation,
): readonly NavItem[] {
  return [
    ...nav.primary,
    ...nav.footer.work,
    ...nav.footer.company,
    ...nav.footer.legal,
    nav.cta,
  ];
}

export function listFooterItems(
  nav: Navigation = navigation,
): readonly NavItem[] {
  return [...nav.footer.work, ...nav.footer.company, ...nav.footer.legal];
}
