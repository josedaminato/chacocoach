"use client";

import { usePathname } from "next/navigation";
import { WhatsAppButton } from "./WhatsAppButton";
import { ScrollToTop } from "./ScrollToTop";

export function FloatingButtons() {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return null;

  return (
    <>
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
