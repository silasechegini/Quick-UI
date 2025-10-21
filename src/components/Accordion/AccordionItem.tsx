import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  ACCORDION_ICON_POSITIONS,
  AccordionItemProps,
} from "./Accordion.types";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";
import { Icon } from "@components/Icon";
import { ICONS } from "@assets/iconType";
import { Button, BUTTON_VARIANTS } from "@components/Button";

export const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isExpanded,
  onToggle,
  variant,
  size,
  expandIcon,
  iconPosition,
  disabled,
  elevateExpanded,
  transitionDuration,
  index,
  totalItems,
  onItemFocus,
  ...rest
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isItemDisabled = disabled || item.disabled;

  // Calculate and set the content height
  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
      setIsTransitioning(true);

      // After transition completes, set to auto for dynamic content
      const timer = setTimeout(() => {
        setHeight("auto");
        setIsTransitioning(false);
      }, transitionDuration);

      return () => clearTimeout(timer);
    } else {
      setHeight(0);
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [isExpanded, transitionDuration]);

  // Recalculate height if content changes while expanded
  useEffect(() => {
    if (!isExpanded || !contentRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (height === "auto" && contentRef.current) {
        // Content changed while in auto mode, we don't need to update
        return;
      }
      // Content changed while in fixed mode, we need to update
      const contentHeight = contentRef.current?.scrollHeight || 0;
      setHeight(contentHeight);
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [isExpanded, height]);

  const handleToggle = useCallback(() => {
    if (isItemDisabled || item.isLoading) return;
    onToggle(item.id);
  }, [isItemDisabled, item.isLoading, item.id, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isItemDisabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          handleToggle();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (index < totalItems - 1 && onItemFocus) {
            onItemFocus(index + 1);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (index > 0 && onItemFocus) {
            onItemFocus(index - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          if (onItemFocus) {
            onItemFocus(0);
          }
          break;
        case "End":
          e.preventDefault();
          if (onItemFocus) {
            onItemFocus(totalItems - 1);
          }
          break;
      }
    },
    [isItemDisabled, handleToggle, index, totalItems, onItemFocus],
  );

  const itemClasses = combineClasses(
    styles.accordionItem,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    isExpanded && styles.expanded,
    isItemDisabled && styles.disabled,
    item.isLoading && styles.loading,
    elevateExpanded && isExpanded && styles.elevated,
    isTransitioning && styles.transitioning,
    item.className,
  );

  const triggerClasses = combineClasses(
    styles.trigger,
    iconPosition === ACCORDION_ICON_POSITIONS.START && styles.iconStart,
    iconPosition === ACCORDION_ICON_POSITIONS.END && styles.iconEnd,
  );

  const contentClasses = combineClasses(
    styles.content,
    isExpanded && styles.contentExpanded,
  );

  const iconClasses = combineClasses(
    styles.expandIcon,
    item.isLoading && styles.loadingIcon,
  );

  const renderIcon = () => {
    if (item.isLoading) {
      return <Icon name={ICONS.LOADING_ICON} className={iconClasses} />;
    }
    if (expandIcon) {
      return <span className={iconClasses}>{expandIcon}</span>;
    }
    return <Icon name={ICONS.CHEVRON_DOWN_ICON} className={iconClasses} />;
  };

  const renderTriggerContent = () => (
    <>
      {iconPosition === ACCORDION_ICON_POSITIONS.START && renderIcon()}

      <div className={styles.triggerContent}>
        {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{item.title}</span>
          {item.subtitle && (
            <span className={styles.subtitle}>{item.subtitle}</span>
          )}
        </div>
      </div>

      {iconPosition === ACCORDION_ICON_POSITIONS.END && renderIcon()}
    </>
  );

  return (
    <div className={itemClasses} {...rest}>
      <Button
        className={triggerClasses}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={isItemDisabled || item.isLoading}
        aria-expanded={isExpanded}
        aria-disabled={isItemDisabled || item.isLoading}
        aria-controls={`accordion-content-${item.id}`}
        id={`accordion-trigger-${item.id}`}
        tabIndex={0}
        fullWidth
        variant={BUTTON_VARIANTS.PLAIN}
      >
        {renderTriggerContent()}
      </Button>

      <div
        ref={contentRef}
        className={contentClasses}
        style={{
          height: height === "auto" ? "auto" : `${height}px`,
          transitionDuration: `${transitionDuration}ms`,
        }}
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-trigger-${item.id}`}
      >
        <div className={styles.contentInner}>{item.content}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
