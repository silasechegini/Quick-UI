import { FC } from "react";
import styles from "../styles.module.scss";
import { FlyoutBodyProps } from "../Flyout.types";

const FlyoutBody: FC<FlyoutBodyProps> = ({ children, className }) => {
  return <div className={`${styles.body} ${className || ""}`}>{children}</div>;
};
export default FlyoutBody;
