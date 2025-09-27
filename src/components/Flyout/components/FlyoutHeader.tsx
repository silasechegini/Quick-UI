import { FC } from "react";
import styles from "../styles.module.scss";
import { FlyoutHeaderProps } from "../Flyout.types";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "@components/Button";
import { iconSvgMapping } from "@assets";

const CloseIcon = iconSvgMapping["close_icon"];

const FlyoutHeader: FC<FlyoutHeaderProps> = ({
  children,
  className,
  onClose,
}) => {
  return (
    <div className={`${styles.headerContainer} ${className || ""}`}>
      <div className={styles.headerTitle}>{children}</div>
      <div>
        <Button
          variant={BUTTON_VARIANTS.TERTIARY}
          size={BUTTON_SIZES.EXTRASMALL}
          onClick={onClose}
          icon={<CloseIcon className={styles.clearIcon} />}
        />
      </div>
    </div>
  );
};
export default FlyoutHeader;
