import { ReactNode, HTMLAttributes } from "react";

export type CardProps = {
  /** Optional header content, can be a string or a ReactNode */
  header?: ReactNode;
  /** Optional footer content, can be a string or a ReactNode */
  footer?: ReactNode;
  /** Main content of the card */
  children: ReactNode;
  /** Card elevation (shadow) level */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** If true, adds a border to the card */
  bordered?: boolean;
  /** If true, makes the card hoverable */
  hoverable?: boolean;
  /** Custom className for the card */
  className?: string;
  /** Custom styles for the card */
  style?: React.CSSProperties;
} & HTMLAttributes<HTMLDivElement>;
