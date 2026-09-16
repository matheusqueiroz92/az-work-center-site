"use server";

import { headers } from "next/headers";

import type { ContactActionState } from "@/lib/contact-action-state";
import { readContactFrequencyKey } from "@/lib/contact-frequency";
import { getContactProvider } from "@/lib/contact-provider";
import { submitContactLead } from "@/lib/contact-submit";

async function readRequestFrequencyKey(): Promise<string | undefined> {
  try {
    return readContactFrequencyKey(await headers());
  } catch {
    return undefined;
  }
}

export async function submitContactAction(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  try {
    return await submitContactLead({
      formData,
      provider: getContactProvider(),
      frequencyKey: await readRequestFrequencyKey(),
    });
  } catch {
    return { status: "unavailable" };
  }
}
