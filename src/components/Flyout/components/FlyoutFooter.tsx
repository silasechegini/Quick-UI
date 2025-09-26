import { FC } from "react";
import styles from "../styles.module.scss";
import { FlyoutFooterProps } from "../Flyout.types";

const FlyoutFooter: FC<FlyoutFooterProps> = ({ children, className }) => {
  return (
    <div className={`${styles.footer} ${className || ""}`}>{children}</div>
  );
};
export default FlyoutFooter;
