/**
 * Tokens de movimento usados pela Fatia A e pela Fatia B.
 * Origem: design-system/tokens.json → motion
 * e docs/05-motion-system.md.
 *
 * CSS documenta milissegundos. A Motion usa segundos.
 * A Hero 3D e as linhas editoriais usam variáveis de tokens.css.
 * O spring do painel não existe em tokens.json; a fonte é docs/05.
 * Não importar o JSON no bundle.
 */

export const durationDeliberateMs = 650;
export const durationDeliberateSeconds = 0.65;

export const easeEmphasized = [0.16, 1, 0.3, 1] as const;

export const panelSpring = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 1,
} as const;

export const panelShiftY = 16;
