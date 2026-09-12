import { cn } from "@/lib/utils";
import type { EditorialItem } from "@/types/content";

export type EditorialListProps = {
  items: readonly EditorialItem[];
  numbered?: boolean;
  className?: string;
};

export function EditorialList({
  items,
  numbered = false,
  className,
}: EditorialListProps) {
  const List = numbered ? "ol" : "ul";

  return (
    <List
      className={cn("border-border divide-border divide-y border-y", className)}
    >
      {items.map((item, index) => (
        <li
          key={item.title}
          className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-10"
        >
          <p className="text-h3 text-foreground font-semibold">
            {numbered ? (
              <span className="text-muted-foreground text-label mr-3 font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            {item.title}
          </p>
          <p className="text-body text-muted-foreground max-w-text">
            {item.description}
          </p>
        </li>
      ))}
    </List>
  );
}
