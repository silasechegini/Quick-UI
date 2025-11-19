/** Type and enum definitions for Chip component */

/** Enums for Chip component props */
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

/** Type aliases for Chip component props */
export type ChipSizes = (typeof CHIP_SIZES)[keyof typeof CHIP_SIZES];
export type ChipVariants = (typeof CHIP_VARIANTS)[keyof typeof CHIP_VARIANTS];
export type ChipStatuses = (typeof CHIP_STATUSES)[keyof typeof CHIP_STATUSES];

/** Props for the Chip component */

export interface ChipProps {
  text: string;
  size?: ChipSizes;
  status?: ChipStatuses | { class: string };
  className?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: ChipVariants;
  children?: React.ReactNode;
  interactive?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}
