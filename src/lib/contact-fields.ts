export const contactFields = [
  "name",
  "company",
  "email",
  "phone",
  "need",
  "message",
] as const;

export type ContactField = (typeof contactFields)[number];

export const contactHoneypotField = "companyWebsite";
export const contactStartedAtField = "startedAt";

export const contactFieldLimits = {
  name: { min: 2, max: 80 },
  company: { min: 2, max: 120 },
  email: { min: 3, max: 254 },
  phone: { min: 10, max: 15 },
  message: { min: 20, max: 2000 },
  raw: 8000,
} as const;

export const contactMinElapsedMs = 1500;

export const contactFieldErrorMessages: Record<ContactField, string> = {
  name: "Informe o nome com 2 a 80 caracteres.",
  company: "Informe a empresa com 2 a 120 caracteres.",
  email: "Informe um e-mail válido.",
  phone: "Informe um telefone com DDD.",
  need: "Selecione o tipo de necessidade.",
  message: "Descreva o contexto com 20 a 2.000 caracteres.",
};

export const contactGenericFormError =
  "Não foi possível validar o envio. Verifique os campos e tente de novo.";
