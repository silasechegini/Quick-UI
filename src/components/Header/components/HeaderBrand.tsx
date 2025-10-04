import { FC, ReactNode } from "react";
import { Button, BUTTON_VARIANTS } from "../../Button";
import styles from "../styles.module.scss";

interface HeaderBrandProps {
  logo?: ReactNode;
  brandName?: string;
  onBrandClick?: () => void;
}

export const HeaderBrand: FC<HeaderBrandProps> = ({
  logo,
  brandName,
  onBrandClick,
}) => {
  if (!logo && !brandName) return null;

  const brandContent = (
    <>
      {logo && <div className={styles.logo}>{logo}</div>}
      {brandName && <h1 className={styles.brandName}>{brandName}</h1>}
    </>
  );

  if (onBrandClick) {
    return (
      <Button
        variant={BUTTON_VARIANTS.TERTIARY}
        className={styles.brand}
        onClick={onBrandClick}
        aria-label={`Go to ${brandName || "home"}`}
      >
        {brandContent}
      </Button>
    );
  }

  return <div className={styles.brand}>{brandContent}</div>;
};
