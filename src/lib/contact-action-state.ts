import type { ContactField } from "@/lib/contact-fields";

export type ContactActionState =
  | { status: "idle" }
  | {
      status: "validation";
      fieldErrors: Partial<Record<ContactField, string[]>>;
      formError?: string;
    }
  | { status: "blocked" }
  | { status: "unavailable" }
  | { status: "success"; submissionId: string };

export const idleContactActionState: ContactActionState = { status: "idle" };
