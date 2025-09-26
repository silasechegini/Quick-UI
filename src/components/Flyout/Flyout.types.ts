import { HTMLAttributes, ReactNode } from "react";

export interface FlyoutProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  role?: "dialog" | "complementary";
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}
