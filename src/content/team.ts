import type { TeamMember } from "@/types/content";

export const founders = [
  {
    name: "Matheus Queiroz",
    role: "Engenharia de software, desenvolvimento web full stack, produto e IA aplicada.",
    bio: "Cuida da arquitetura, do produto e da construção das soluções — do sistema à automação.",
  },
  {
    name: "Lucas Queiroz",
    role: "Growth, vendas pela internet, tráfego e estratégia comercial.",
    bio: "Cuida do enquadramento comercial e da estrutura de crescimento — da conversa inicial à presença que precisa converter.",
  },
] as const satisfies readonly TeamMember[];

export const foundersNote =
  "Atendimento e condução ficam com os fundadores. Atuação inicial em Vitória da Conquista e região.";
