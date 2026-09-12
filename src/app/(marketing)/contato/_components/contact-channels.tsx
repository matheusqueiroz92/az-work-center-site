import { ButtonLink } from "@/components/ui/button-link";
import { contact, type ContactChannel } from "@/content/contact";

function ContactChannelItem({
  channel,
  variant,
}: {
  channel: ContactChannel;
  variant: "primary" | "secondary";
}) {
  return (
    <li className="flex flex-col gap-6 py-8 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
      <p className="text-h3 text-foreground font-semibold">
        {channel.displayValue}
      </p>
      <ButtonLink
        href={channel.href}
        variant={variant}
        size="lg"
        openInNewTab={channel.openInNewTab}
        className="w-full md:w-auto"
      >
        {channel.actionLabel}
      </ButtonLink>
    </li>
  );
}

export function ContactChannels() {
  const [whatsapp, email] = contact.channels.items;

  return (
    <ul className="border-border divide-border mt-12 grid divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0 md:py-10">
      <ContactChannelItem channel={whatsapp} variant="primary" />
      <ContactChannelItem channel={email} variant="secondary" />
    </ul>
  );
}
