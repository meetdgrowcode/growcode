// src/components/ui/avatar.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  initials?: string;
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, initials = "U", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children || (
        <div className="flex h-full w-full items-center justify-center bg-sky-100 text-sky-700 font-medium uppercase text-sm">
          {initials}
        </div>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

// ← AvatarFallback manually add kar diya
const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-sky-100 text-sky-700 font-medium uppercase text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback };