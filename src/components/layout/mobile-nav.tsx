"use client";

import { useState } from "react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";
import { buttonClassName } from "@/components/ui/button-styles";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/content/navigation";

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 5.5h14M3 10h14M3 14.5h14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export type MobileNavProps = {
  items: readonly NavItem[];
  cta: NavItem;
};

export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={buttonClassName({ variant: "ghost", size: "icon" })}
        aria-label="Abrir menu"
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <div className="border-border px-gutter flex items-center justify-between gap-4 border-b py-4">
          <SheetTitle className="text-body font-semibold">
            Menu de navegação
          </SheetTitle>
          <SheetDescription className="sr-only">
            Links principais do site da AZ Work Center.
          </SheetDescription>
          <SheetClose
            className={buttonClassName({ variant: "ghost", size: "icon" })}
            aria-label="Fechar menu"
          >
            <CloseIcon />
          </SheetClose>
        </div>
        <nav
          aria-label="Principal"
          className="px-gutter flex flex-1 flex-col overflow-y-auto py-6"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-border border-b">
                <Link
                  href={item.href}
                  className="text-foreground min-h-touch text-body-lg flex items-center py-4 font-semibold"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink
              href={cta.href}
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </ButtonLink>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
