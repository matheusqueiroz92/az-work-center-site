import { describe, expect, it } from "vitest";

import { getPublishedProjects, projects } from "@/content/projects";

describe("projects", () => {
  it("começa vazio e sem nomes de cases", () => {
    expect(projects).toEqual([]);
    expect(JSON.stringify(projects)).not.toMatch(
      /óticas queiroz|m\.agendy|dentyvo|rebouças/i,
    );
  });

  it("não publica nenhum projeto nesta fase", () => {
    expect(getPublishedProjects()).toEqual([]);
  });

  it("só devolve itens aprovados e publicados quando a lista é fornecida", () => {
    expect(
      getPublishedProjects([
        {
          slug: "exemplo",
          client: "Cliente interno de teste",
          segment: "Serviços",
          services: [],
          approved: true,
          published: true,
        },
        {
          slug: "rascunho",
          client: "Rascunho interno de teste",
          segment: "Serviços",
          services: [],
          approved: true,
          published: false,
        },
      ]),
    ).toHaveLength(1);
  });
});
