import { FC, SetStateAction, useCallback, useEffect, useRef } from "react";
import { ImageAvatarProps } from "../Avatar.types";
import {
  combineClasses,
  generateInitials,
  getBackgroundColor,
} from "../../../utils";
import styles from "../styles.module.scss";

/**
 * Props for the ImageAvatar renderer component
 * @interface ImageAvatarRendererProps
 * @extends {ImageAvatarProps}
 */
type ImageAvatarRendererProps = ImageAvatarProps & {
  /** Combined CSS classes for the avatar container */
  avatarClasses: string;
  /** Whether an image loading error has occurred */
  imageError: boolean;
  /** State setter function to set the image error state */
  setImageError: (value: SetStateAction<boolean>) => void;
};

/**
 * ImageAvatar renderer component that displays an image-based avatar with fallback support.
 *
 * This component handles image loading, error states, and provides automatic fallback
 * to initials-based avatar when the image fails to load. It includes proper accessibility
 * attributes and responsive styling.
 *
 * @component
 *
 * @param {ImageAvatarRendererProps} props - The props for the ImageAvatar component
 * @param {string} props.src - The URL of the image to display
 * @param {string} [props.alt] - Alternative text for the image
 * @param {string} [props.fallback] - Name to generate initials from if image fails
 * @param {string} props.avatarClasses - CSS classes for styling the avatar
 * @param {boolean} props.imageError - Whether an image error has occurred
 * @param {Function} props.setImageError - Function to update image error state
 * @param {Function} [props.onImageError] - Callback fired when image fails to load
 * @param {string} [props.ariaLabel] - Custom ARIA label for accessibility
 * @param {React.CSSProperties} [props.style] - Custom inline styles
 *
 * @returns {JSX.Element} The rendered ImageAvatar component
 *
 * @since 1.0.0
 */
const ImageAvatar: FC<ImageAvatarRendererProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  imageError,
  alt,
  setImageError,
  ...props
}) => {
  const { src, fallback, onImageError, ...imageRestProps } = props;

  const onImageErrorRef = useRef(onImageError);

  useEffect(() => {
    onImageErrorRef.current = onImageError;
  }, [onImageError]);

  /**
   * Handles image loading errors by updating the error state and invoking
   * the optional error callback if provided.
   *
   * @callback handleImageError
   * @returns {void}
   */
  const handleImageError = useCallback(() => {
    setImageError(true);
    if (onImageErrorRef.current) {
      onImageErrorRef.current();
    }
  }, [setImageError]);

  if (imageError && fallback) {
    // Show fallback initials
    const fallbackStyle = {
      backgroundColor: getBackgroundColor(fallback),
      color: "var(--color-white)",
      ...style,
    };

    return (
      <div
        className={combineClasses(avatarClasses, styles["variant-initials"])}
        style={fallbackStyle}
        role="img"
        aria-label={ariaLabel || alt || `Avatar for ${fallback}`}
        {...imageRestProps}
      >
        {generateInitials(fallback)}
      </div>
    );
  }

  return (
    <div
      className={avatarClasses}
      style={style}
      role="img"
      aria-label={ariaLabel || alt || "User avatar"}
      {...imageRestProps}
    >
      <img
        className={styles.image}
        src={src}
        alt={alt || "Avatar"}
        onError={handleImageError}
      />
    </div>
  );
};
export default ImageAvatar;
