"use client";

import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { trackEvent } from "@/lib/analytics";

interface HarbizCTAProps {
  location: string;
  slug?: string;
  plan?: string;
  children: React.ReactNode;
  className?: string;
}

export function HarbizCTA({
  location,
  slug,
  plan,
  children,
  className,
}: HarbizCTAProps) {
  return (
    <Link
      href={trainerConfig.harbizUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("click_harbiz_cta", {
          location,
          ...(slug && { slug }),
          ...(plan && { plan }),
        })
      }
      className={className}
    >
      {children}
    </Link>
  );
}
