import type { TeamMember } from "@/types/content";

export function FounderProfile({ member }: { member: TeamMember }) {
  return (
    <article className="min-w-0">
      <h3 className="font-editorial text-h2 text-foreground">{member.name}</h3>
      <p className="text-body-lg text-foreground max-w-text mt-4">
        {member.role}
      </p>
      {member.bio ? (
        <p className="text-body text-muted-foreground max-w-text mt-4">
          {member.bio}
        </p>
      ) : null}
    </article>
  );
}
