import Image from "next/image";

interface LogoProps {
  size?: number;
  priority?: boolean;
}

/** Asl logo nisbati 216×256 */
export function Logo({ size = 64, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="CHTT Test logotipi"
      width={Math.round((size * 216) / 256)}
      height={size}
      priority={priority}
    />
  );
}
