import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y border-0 border-b border-[var(--color-line)] bg-transparent px-0 py-3 text-base text-[var(--color-ink)] transition-[border-color] duration-200 placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-brand)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
