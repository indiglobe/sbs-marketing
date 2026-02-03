import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/utils/cn/index";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  className?: string;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  const variantClasses: Record<ButtonVariant, string> = {
    default:
      "bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)]",
    destructive:
      "bg-[var(--color-destructive)] text-white hover:bg-[var(--color-destructive-700)]",
    outline:
      "border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-brand-50)]",
    secondary:
      "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:bg-[var(--color-secondary-600)]",
    ghost:
      "bg-transparent hover:bg-[var(--color-brand-50)] text-[var(--color-foreground)]",
    link:
      "bg-transparent underline text-[var(--color-brand-500)] hover:text-[var(--color-brand-600)]",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    default: "h-9 px-4 py-2 text-sm",
    xs: "h-6 px-2 py-1 text-xs",
    sm: "h-8 px-3 py-2 text-sm",
    lg: "h-10 px-6 text-base",
    icon: "w-9 h-9 p-0",
    "icon-xs": "w-6 h-6 p-0",
    "icon-sm": "w-8 h-8 p-0",
    "icon-lg": "w-10 h-10 p-0",
  };

  return (
    <Comp
      data-variant={variant}
      data-size={size}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-(--color-brand-500)",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
