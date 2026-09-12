import { company } from "@/content/company";

export default function HomePage() {
  return (
    <main
      id="conteudo"
      tabIndex={-1}
      className="bg-background text-foreground min-h-svh"
    >
      <div className="max-w-text mx-auto px-5 py-16">
        <p className="text-muted-foreground text-sm">{company.descriptor}</p>
        <h1 className="text-foreground mt-4 text-4xl font-semibold tracking-tight">
          {company.name}
        </h1>
        <p className="text-foreground mt-6 max-w-prose text-base leading-relaxed">
          O novo site está em desenvolvimento.
        </p>
      </div>
    </main>
  );
}
