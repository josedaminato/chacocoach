import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";
import { trainerConfig } from "@/lib/getConfig";

interface BrandLogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
}

export function BrandLogo({
  className = "",
  height = 44,
  priority = false,
}: BrandLogoProps) {
  const logoPath = trainerConfig.logo ?? "/logo.png";

  return (
    <Image
      src={assetUrl(logoPath)}
      alt={trainerConfig.name}
      width={Math.round(height * 1.15)}
      height={height}
      className={`object-contain ${className}`}
      priority={priority}
      unoptimized
    />
  );
}
