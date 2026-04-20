"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
};

export default function TrackedLink({
  event,
  properties,
  onClick,
  children,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, properties);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
