import { ReactNode, HTMLAttributes } from "react";

/**
 * Accordion Component Types and Enums
 * This file defines the types and enums used in the Accordion component.
 */

/**
 * Enums for Accordion Component
 */
export enum ACCORDION_VARIANTS {
  DEFAULT = "default",
  OUTLINED = "outlined",
  FILLED = "filled",
  GLASS = "glass",
  GRADIENT = "gradient",
}

export enum ACCORDION_SIZES {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum EXPAND_MODES {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

export enum ACCORDION_ICON_POSITIONS {
  START = "start",
  END = "end",
}

export type AccordionVariant =
  (typeof ACCORDION_VARIANTS)[keyof typeof ACCORDION_VARIANTS];
export type AccordionSize =
  (typeof ACCORDION_SIZES)[keyof typeof ACCORDION_SIZES];
export type ExpandMode = (typeof EXPAND_MODES)[keyof typeof EXPAND_MODES];
export type AccordionIconPosition =
  (typeof ACCORDION_ICON_POSITIONS)[keyof typeof ACCORDION_ICON_POSITIONS];

/**
 * AccordionItemData - Data structure for accordion items
 */
export interface AccordionItemData {
  /** Unique identifier for the accordion item */
  id: string;
  /** The title/header of the accordion item */
  title: ReactNode;
  /** The content to display when expanded */
  content: ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Whether this item is loading */
  isLoading?: boolean;
  /** Custom icon for this specific item */
  icon?: ReactNode;
  /** Custom class for this item */
  className?: string;
  /** Subtitle or secondary text */
  subtitle?: ReactNode;
}

/**
 * AccordionProps - Props for the main Accordion component
 */
export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Array of accordion items */
  items: AccordionItemData[];
  /** Visual variant of the accordion */
  variant?: AccordionVariant;
  /** Size of the accordion */
  size?: AccordionSize;
  /** Expansion mode - single or multiple items can be open */
  expandMode?: ExpandMode;
  /** Controlled expanded items (array of item IDs) */
  expanded?: string[];
  /** Default expanded items for uncontrolled mode */
  defaultExpanded?: string[];
  /** Callback when expansion state changes */
  onChange?: (expandedIds: string[]) => void;
  /** Custom expand/collapse icon */
  expandIcon?: ReactNode;
  /** Position of the expand icon */
  iconPosition?: AccordionIconPosition;
  /** Whether all items are disabled */
  disabled?: boolean;
  /** Whether to show dividers between items */
  showDividers?: boolean;
  /** Whether to elevate expanded items */
  elevateExpanded?: boolean;
  /** Custom class name */
  className?: string;
  /** Transition duration in ms */
  transitionDuration?: number;
  /** Callback before item expands */
  onBeforeExpand?: (id: string) => void | Promise<void>;
  /** Callback after item expands */
  onAfterExpand?: (id: string) => void;
  /** Callback before item collapses */
  onBeforeCollapse?: (id: string) => void;
  /** Callback after item collapses */
  onAfterCollapse?: (id: string) => void;
  /** Allow toggle (collapse when clicking expanded item) */
  allowToggle?: boolean;
  /** Custom empty state */
  emptyState?: ReactNode;
}

/**
 * AccordionItemProps - Props for individual accordion items
 */
export interface AccordionItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onFocus" | "onToggle"> {
  /** Item data */
  item: AccordionItemData;
  /** Whether this item is expanded */
  isExpanded: boolean;
  /** Handler for toggle */
  onToggle: (id: string) => void;
  /** Visual variant */
  variant: AccordionVariant;
  /** Size */
  size: AccordionSize;
  /** Custom expand icon */
  expandIcon?: ReactNode;
  /** Icon position */
  iconPosition: AccordionIconPosition;
  /** Global disabled state */
  disabled?: boolean;
  /** Whether to elevate when expanded */
  elevateExpanded?: boolean;
  /** Transition duration */
  transitionDuration: number;
  /** Index for keyboard navigation */
  index: number;
  /** Total number of items */
  totalItems: number;
  /** Focus handler */
  onItemFocus?: (index: number) => void;
}
