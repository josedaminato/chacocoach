import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";
import { trainerConfig } from "@/lib/getConfig";

const LOGO_ASPECT = 320 / 170;

interface BrandLogoProps {
  className?: string;
  height?: number;
  width?: number;
  priority?: boolean;
  src?: string;
}

export function BrandLogo({
  className = "",
  height = 44,
  width,
  priority = false,
  src,
}: BrandLogoProps) {
  const logoPath = src ?? trainerConfig.logo ?? "/hero-logo.png";
  const imageWidth = width ?? Math.round(height * LOGO_ASPECT);

  return (
    <Image
      src={assetUrl(logoPath)}
      alt={trainerConfig.name}
      width={imageWidth}
      height={height}
      className={`object-contain ${className}`}
      priority={priority}
      unoptimized
    />
  );
}
