import {
  parseContactDeliveryEnv,
  readContactEnvSource,
  type ContactEnvSource,
} from "@/lib/contact-env";
import {
  logContactOperational,
  resolveContactRuntimeEnv,
} from "@/lib/contact-log";
import { createResendContactProvider } from "@/lib/contact-resend";
import {
  disabledContactProvider,
  type ContactProvider,
} from "@/lib/contact-submit";

export function getContactProvider(
  source: ContactEnvSource = readContactEnvSource(),
): ContactProvider {
  const config = parseContactDeliveryEnv(source);
  const vercelEnv = resolveContactRuntimeEnv(source.VERCEL_ENV);

  if (config.status === "disabled") {
    return disabledContactProvider;
  }

  if (config.status === "unavailable") {
    logContactOperational({
      code: "contact.env.invalid",
      vercelEnv,
      category: "misconfigured",
    });
    return disabledContactProvider;
  }

  return createResendContactProvider({
    apiKey: config.apiKey,
    toEmail: config.toEmail,
    fromEmail: config.fromEmail,
    vercelEnv,
  });
}
