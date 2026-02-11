import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import logoImage from "@/assets/sbs.png";
import { cn } from "@/utils/cn";

export function Logo() {
  return (
    <Link to="/" className={cn(`flex items-center gap-2`)}>
      <span className={cn(`flex size-16`)}>
        <Image src={logoImage} alt="logo" layout="fullWidth" />
      </span>
      <span>SBS Marketing</span>
    </Link>
  );
}
