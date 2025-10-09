export interface ChipProps {
  text: string;
  size?: "small" | "medium" | "large";
  status?: "info" | "success" | "warning" | "error" | { class: string };
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: "solid" | "outline" | "ghost";
  children?: React.ReactNode;
  interactive?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export enum CHIP_SIZES {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum CHIP_VARIANTS {
  SOLID = "solid",
  OUTLINE = "outline",
  GHOST = "ghost",
}

export enum CHIP_STATUSES {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}
