import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { TextLink } from "@/components/ui/text-link";
import { company } from "@/content/company";
import { navigation, type NavItem } from "@/content/navigation";

function FooterNavGroup({
  label,
  items,
}: {
  label: string;
  items: readonly NavItem[];
}) {
  return (
    <nav aria-label={label}>
      <p className="text-small font-semibold">{label}</p>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <TextLink
              href={item.href}
              className="min-h-touch inline-flex items-center"
            >
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-surface="dark"
      className="bg-background text-foreground border-border border-t"
    >
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] lg:items-start lg:gap-16">
          <div className="max-w-text">
            <Link
              href="/"
              aria-label={`${company.name} — Soluções que Transformam`}
              className="focus-visible:ring-ring inline-flex min-h-11 max-w-full rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <Image
                src="/media/brand/az-wordmark-slogan-on-dark.png"
                alt=""
                width={1992}
                height={791}
                sizes="(max-width: 640px) 256px, 288px"
                className="h-auto w-64 max-w-full md:w-72"
              />
            </Link>
            <p className="text-muted-foreground text-small mt-3">
              {company.descriptor}
            </p>
            <p className="text-muted-foreground text-body mt-6">
              {company.regionLabel}
            </p>
          </div>

          <FooterNavGroup label="Atuação" items={navigation.footer.work} />
          <FooterNavGroup label="Empresa" items={navigation.footer.company} />
        </div>

        <div className="border-border mt-16 flex flex-col gap-6 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground text-small">
            © {year} {company.name}
          </p>
          {navigation.footer.legal.length > 0 ? (
            <nav aria-label="Informações legais">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {navigation.footer.legal.map((item) => (
                  <li key={item.href}>
                    <TextLink
                      href={item.href}
                      className="min-h-touch inline-flex items-center"
                    >
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
