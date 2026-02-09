import clsx from "clsx";

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  fallback?: string;
  className?: string;
};

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-20 w-20 text-lg",
};

export function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  fallback,
  className,
}: AvatarProps) {
  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full",
        "bg-brand-500 text-white",
        "overflow-hidden select-none",
        sizeClasses[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="font-medium">
          {fallback?.slice(0, 2).toUpperCase() ?? "?"}
        </span>
      )}
    </div>
  );
}
