import React, { SetStateAction } from "react";
import {
  AvatarProps,
  AvatarVariants,
  ImageAvatarProps,
  InitialsAvatarProps,
  IconAvatarProps,
  PlaceholderAvatarProps,
  AVATAR_VARIANTS,
} from "../Avatar.types";
import ImageAvatar from "./ImageAvatar";
import InitialsAvatar from "./InitialsAvatar";
import IconAvatar from "./IconAvatar";
import PlaceholderAvatar from "./PlaceholderAvatar";

/**
 * Factory function to create appropriate avatar renderer
 */
export const createAvatarRenderer = (
  variant: AvatarVariants,
  props: AvatarProps,
  avatarClasses: string,
  imageError?: boolean,
  setImageError?: (value: SetStateAction<boolean>) => void,
): React.ReactElement => {
  switch (variant) {
    case AVATAR_VARIANTS.IMAGE:
      return (
        <ImageAvatar
          {...(props as ImageAvatarProps)}
          avatarClasses={avatarClasses}
          imageError={imageError!}
          setImageError={setImageError!}
        />
      );

    case AVATAR_VARIANTS.INITIALS:
      return (
        <InitialsAvatar
          {...(props as InitialsAvatarProps)}
          avatarClasses={avatarClasses}
        />
      );

    case AVATAR_VARIANTS.ICON:
      return (
        <IconAvatar
          {...(props as IconAvatarProps)}
          avatarClasses={avatarClasses}
        />
      );

    case AVATAR_VARIANTS.PLACEHOLDER:
      return (
        <PlaceholderAvatar
          {...(props as PlaceholderAvatarProps)}
          avatarClasses={avatarClasses}
        />
      );

    default:
      throw new Error(`Unsupported avatar variant: ${variant}`);
  }
};

/**
 * Check if a variant is supported
 */
export const isVariantSupported = (
  variant: string,
): variant is AvatarVariants => {
  return Object.values(AVATAR_VARIANTS).includes(variant as AvatarVariants);
};

/**
 * Get all supported variants
 */
export const getSupportedVariants = (): AvatarVariants[] => {
  return Object.values(AVATAR_VARIANTS);
};
