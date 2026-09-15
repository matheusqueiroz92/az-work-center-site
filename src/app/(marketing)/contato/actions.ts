"use server";

import type { ContactActionState } from "@/lib/contact-action-state";
import {
  disabledContactProvider,
  submitContactLead,
} from "@/lib/contact-submit";

export async function submitContactAction(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    return await submitContactLead({
      formData,
      provider: disabledContactProvider,
    });
  } catch {
    return { status: "unavailable" };
  }
}
