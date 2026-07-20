import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition duration-200 disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
