import { FC, SetStateAction, useCallback, useEffect, useRef } from "react";
import { ImageAvatarProps } from "../Avatar.types";
import {
  combineClasses,
  generateInitials,
  getBackgroundColor,
} from "../../../utils";
import styles from "../styles.module.scss";

type ImageAvatarRendererProps = ImageAvatarProps & {
  avatarClasses: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  imageError: boolean;
  setImageError: (value: SetStateAction<boolean>) => void;
};

const ImageAvatar: FC<ImageAvatarRendererProps> = ({
  avatarClasses,
  style,
  ariaLabel,
  imageError,
  alt,
  setImageError,
  ...props
}: ImageAvatarRendererProps) => {
  // Image avatar

  const { src, fallback, onImageError, ...imageRestProps } = props;

  /**
   * Handle image loading errors
   */
  // Use a ref to hold the latest onImageError callback
  const onImageErrorRef = useRef(onImageError);
  useEffect(() => {
    onImageErrorRef.current = onImageError;
  }, [onImageError]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    if (onImageErrorRef.current) {
      onImageErrorRef.current();
    }
  }, []);

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
