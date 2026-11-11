import React from "react";
import Image from "next/image";

export interface BrandLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function BrandLogo({
  className = "",
  width = 240,
  height = 80,
  priority = true,
}: BrandLogoProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <Image
        src="/images/branding/logo.svg"
        alt="Más Allá del Espejo - Audrey Caballero"
        width={width}
        height={height}
        priority={priority}
        className="h-10 w-auto sm:h-14 object-contain"
      />
    </div>
  );
}

export function BrandRibbonIcon({
  size = 46,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-2xl bg-[#FEF3C7] border border-[#F0DE9C] p-2 shadow-xs ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/branding/liston.svg"
        alt="Lazo Oficial Más Allá del Espejo"
        width={size}
        height={size}
        className="h-full w-full object-contain"
      />
    </div>
  );
}