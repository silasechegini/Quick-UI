import { forwardRef } from "react";
import { CardProps } from "./Card.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";

const getElevationClass = (elevation: number = 1): string => {
  switch (elevation) {
    case 0:
      return styles.elevation0;
    case 1:
      return styles.elevation1;
    case 2:
      return styles.elevation2;
    case 3:
      return styles.elevation3;
    case 4:
      return styles.elevation4;
    default:
      return styles.elevation1;
  }
};

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
      getElevationClass(elevation),
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
