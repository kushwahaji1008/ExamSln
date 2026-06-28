import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-200 shadow-sm p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
