import { FC } from "react";
import styles from "../styles.module.scss";
import { FlyoutHeaderProps } from "../Flyout.types";

const FlyoutHeader: FC<FlyoutHeaderProps> = ({ children, className }) => {
  return (
    <div className={`${styles.header} ${className || ""}`}>{children}</div>
  );
};
export default FlyoutHeader;
