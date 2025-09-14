import { ButtonHTMLAttributes, ReactNode, ElementType } from "react";

type ButtonVariants = "primary" | "secondary" | "tertiary";
type ButtonSizes = "xxl" | "xl" | "l" | "m" | "s" | "xs";
type IconPosition = "start" | "end";

type BaseProps = {
  children?: ReactNode;
  size?: ButtonSizes;
  variant?: ButtonVariants;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  as?: ElementType;
  className?: string;
  ariaLabel?: string;
};

export type IconButtonProps = Omit<ButtonProps, "children" | "iconPosition"> & {
  label: string;
};

export type StyleOverride = {
  className?: string;
  style?: React.CSSProperties;
};

export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    type?: "button" | "submit" | "reset";
    styleOverride?: StyleOverride;
  };

export enum BUTTON_TYPES {
  BUTTON = "button",
  SUBMIT = "submit",
  RESET = "reset",
}

export enum BUTTON_SIZES {
  XXLARGE = "xxl",
  XLARGE = "xl",
  LARGE = "l",
  MEDIUM = "m",
  SMALL = "s",
  EXTRASMALL = "xs",
}

export enum BUTTON_VARIANTS {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export enum ICON_POSITIONS {
  START = "start",
  END = "end",
}
