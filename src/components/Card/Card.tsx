import { forwardRef } from "react";
import { CardProps } from "./Card.types";
import { combineClasses, getElevationClass } from "../../utils";
import styles from "./styles.module.scss";

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      header,
      footer,
      children,
      elevation = 1,
      bordered = false,
      hoverable = false,
      className = "",
      style,
      ...rest
    },
    ref,
  ) => {
    const cardClasses = combineClasses(
      styles.card,
      getElevationClass(elevation, styles),
      bordered ? styles.bordered : "",
      hoverable ? styles.hoverable : "",
      className,
    );

    return (
      <div ref={ref} className={cardClasses} style={style} {...rest}>
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
