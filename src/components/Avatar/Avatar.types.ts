import { HTMLAttributes, ReactNode } from "react";

/**
 * Avatar Component Types and Enums
 * This file defines the types and enums used in the Avatar component.
 * It includes props for different avatar variants, sizes, and display modes.
 */

export type AvatarSizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type AvatarShapes = "circle" | "square" | "rounded";
export type AvatarVariants = "image" | "initials" | "icon" | "placeholder";

/**
 * BaseAvatarProps - Common properties for all avatar types
 * @property {AvatarSizes} size - The size of the avatar
 * @property {AvatarShapes} shape - The shape of the avatar
 * @property {string} alt - Alt text for accessibility
 * @property {string} className - Additional CSS class names
 * @property {React.CSSProperties} style - Inline styles
 * @property {string} ariaLabel - ARIA label for accessibility
 */
type BaseAvatarProps = {
  size?: AvatarSizes;
  shape?: AvatarShapes;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * ImageAvatarProps - Props for image-based avatars
 * @property {'image'} variant - Specifies this is an image avatar
 * @property {string} src - Image source URL
 * @property {string} fallback - Fallback text when image fails to load
 * @property {() => void} onImageError - Callback when image fails to load
 */
export type ImageAvatarProps = BaseAvatarProps & {
  variant: "image";
  src: string;
  fallback?: string;
  onImageError?: () => void;
};

/**
 * InitialsAvatarProps - Props for initials-based avatars
 * @property {'initials'} variant - Specifies this is an initials avatar
 * @property {string} initials - The initials to display
 * @property {string} backgroundColor - Custom background color
 * @property {string} textColor - Custom text color
 */
export type InitialsAvatarProps = BaseAvatarProps & {
  variant: "initials";
  initials: string;
  backgroundColor?: string;
  textColor?: string;
};

/**
 * IconAvatarProps - Props for icon-based avatars
 * @property {'icon'} variant - Specifies this is an icon avatar
 * @property {ReactNode} icon - The icon to display
 * @property {string} backgroundColor - Custom background color
 * @property {string} iconColor - Custom icon color
 */
export type IconAvatarProps = BaseAvatarProps & {
  variant: "icon";
  icon: ReactNode;
  backgroundColor?: string;
  iconColor?: string;
};

/**
 * PlaceholderAvatarProps - Props for placeholder avatars
 * @property {'placeholder'} variant - Specifies this is a placeholder avatar
 * @property {string} backgroundColor - Custom background color
 */
export type PlaceholderAvatarProps = BaseAvatarProps & {
  variant?: "placeholder";
  backgroundColor?: string;
};

/**
 * AvatarProps - Union type for all avatar variants
 */
export type AvatarProps =
  | ImageAvatarProps
  | InitialsAvatarProps
  | IconAvatarProps
  | PlaceholderAvatarProps;

/**
 * Enums for Avatar Component
 */
export enum AVATAR_SIZES {
  EXTRA_SMALL = "xs",
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
  EXTRA_LARGE = "xl",
  DOUBLE_EXTRA_LARGE = "xxl",
}

export enum AVATAR_SHAPES {
  CIRCLE = "circle",
  SQUARE = "square",
  ROUNDED = "rounded",
}

export enum AVATAR_VARIANTS {
  IMAGE = "image",
  INITIALS = "initials",
  ICON = "icon",
  PLACEHOLDER = "placeholder",
}
