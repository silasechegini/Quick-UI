/**
 * @fileoverview Avatar Renderer Factory - Factory pattern implementation for avatar components.
 *
 * This module implements the Factory Pattern to provide a centralized way to create
 * avatar renderer components based on variant types. It encapsulates the instantiation
 * logic and provides utility functions for variant validation and enumeration.
 *
 * The factory pattern ensures:
 * - Centralized component creation logic
 * - Type safety across all avatar variants
 * - Consistent prop handling and validation
 * - Easy extensibility for new avatar types
 *
 * @module AvatarRendererFactory
 * @since 1.0.0
 * @author Quick-UI Team
 */

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
 * Factory function to create the appropriate avatar renderer component based on variant.
 *
 * This function implements the Factory Pattern to instantiate the correct avatar
 * renderer component based on the provided variant. It handles type casting and
 * passes the appropriate props to each renderer while maintaining type safety.
 *
 * @factory
 * @example
 * ```
 * // Create an image avatar renderer
 * const imageRenderer = createAvatarRenderer(
 *   AVATAR_VARIANTS.IMAGE,
 *   { src: 'avatar.jpg', alt: 'User' },
 *   'avatar-large',
 *   false,
 *   setImageError
 * );
 *
 * // Create an initials avatar renderer
 * const initialsRenderer = createAvatarRenderer(
 *   AVATAR_VARIANTS.INITIALS,
 *   { initials: 'JD' },
 *   'avatar-medium'
 * );
 * ```
 *
 * @param {AvatarVariants} variant - The avatar variant type to render
 * @param {AvatarProps} props - Props specific to the avatar variant
 * @param {string} avatarClasses - CSS classes to apply to the avatar container
 * @param {boolean} [imageError=false] - Whether image loading failed (required for image variant)
 * @param {Function} [setImageError] - Function to update image error state (required for image variant)
 *
 * @returns {React.ReactElement} The instantiated avatar renderer component
 *
 * @throws {Error} When an unsupported variant is provided
 *
 * @since 1.0.0
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
          imageError={imageError ?? false}
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
 * Type guard function to check if a given string is a supported avatar variant.
 *
 * This function validates whether a provided variant string matches one of the
 * supported avatar variants defined in AVATAR_VARIANTS. It serves as both a
 * runtime check and TypeScript type guard.
 *
 * @example
 * ```
 * if (isVariantSupported(userInput)) {
 *   // TypeScript now knows userInput is AvatarVariants
 *   const renderer = createAvatarRenderer(userInput, props, classes);
 * } else {
 *   console.error('Unsupported variant:', userInput);
 * }
 * ```
 *
 * @param {string} variant - The variant string to validate
 *
 * @returns {boolean} True if the variant is supported, false otherwise
 *
 * @since 1.0.0
 */
export const isVariantSupported = (
  variant: string,
): variant is AvatarVariants => {
  return Object.values(AVATAR_VARIANTS).includes(variant as AvatarVariants);
};

/**
 * Utility function to retrieve all supported avatar variants.
 *
 * Returns an array of all available avatar variants that can be used with
 * the createAvatarRenderer factory function. Useful for validation,
 * UI selection components, or documentation purposes.
 *
 * @example
 * ```
 * const variants = getSupportedVariants();
 * console.log(variants); // ['image', 'initials', 'icon', 'placeholder']
 *
 * // Use in a select component
 * {variants.map(variant => (
 *   <option key={variant} value={variant}>{variant}</option>
 * ))}
 * ```
 *
 * @returns {AvatarVariants[]} Array of all supported avatar variant strings
 *
 * @since 1.0.0
 */
export const getSupportedVariants = (): AvatarVariants[] => {
  return Object.values(AVATAR_VARIANTS);
};
