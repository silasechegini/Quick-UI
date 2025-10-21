import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  AccordionProps,
  EXPAND_MODES,
  ACCORDION_VARIANTS,
  ACCORDION_SIZES,
  ACCORDION_ICON_POSITIONS,
} from "./Accordion.types";
import AccordionItem from "./AccordionItem";
import { combineClasses } from "../../utils";
import styles from "./styles.module.scss";

/**
 * Accordion - A robust, accessible accordion component with advanced features
 *
 * Features:
 * - Single or multiple expansion modes
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Smooth animations with dynamic height
 * - Multiple visual variants (default, outlined, filled, glass, gradient)
 * - Loading states
 * - Disabled states
 * - Custom icons and positioning
 * - Elevation on expand
 * - Lifecycle callbacks
 * - Controlled and uncontrolled modes
 *
 * @param {AccordionItemData[]} items - Array of accordion items
 * @param {AccordionVariant} variant - Visual style variant (default: "default")
 * @param {AccordionSize} size - Size of accordion items (default: "md")
 * @param {ExpandMode} expandMode - Single or multiple expansion (default: "single")
 * @param {string[]} expanded - Controlled expanded items
 * @param {string[]} defaultExpanded - Default expanded items for uncontrolled mode
 * @param {Function} onChange - Callback when expansion state changes
 * @param {ReactNode} expandIcon - Custom expand/collapse icon
 * @param {IconPosition} iconPosition - Position of expand icon (default: "end")
 * @param {boolean} disabled - Disable all items
 * @param {boolean} showDividers - Show dividers between items (default: true)
 * @param {boolean} elevateExpanded - Elevate expanded items (default: false)
 * @param {number} transitionDuration - Animation duration in ms (default: 300)
 * @param {boolean} allowToggle - Allow collapsing expanded items (default: true)
 *
 * @returns {JSX.Element} The rendered Accordion component
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = ACCORDION_VARIANTS.DEFAULT,
  size = ACCORDION_SIZES.MEDIUM,
  expandMode = EXPAND_MODES.SINGLE,
  expanded: controlledExpanded,
  defaultExpanded = [],
  onChange,
  expandIcon,
  iconPosition = ACCORDION_ICON_POSITIONS.END,
  disabled = false,
  showDividers = true,
  elevateExpanded = false,
  className,
  transitionDuration = 300,
  onBeforeExpand,
  onAfterExpand,
  onBeforeCollapse,
  onAfterCollapse,
  allowToggle = true,
  emptyState,
  ...rest
}) => {
  // Check if component is controlled
  const isControlled = controlledExpanded !== undefined;

  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] =
    useState<string[]>(defaultExpanded);

  // Use controlled or internal state
  const expandedItems = isControlled ? controlledExpanded : internalExpanded;

  // Refs for focus management
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle toggle
  const handleToggle = useCallback(
    async (id: string) => {
      const isCurrentlyExpanded = expandedItems.includes(id);

      // Execute before callbacks
      if (isCurrentlyExpanded && onBeforeCollapse) {
        onBeforeCollapse(id);
      } else if (!isCurrentlyExpanded && onBeforeExpand) {
        await onBeforeExpand(id);
      }

      let newExpanded: string[];

      if (expandMode === EXPAND_MODES.SINGLE) {
        // Single mode: only one item can be expanded
        if (isCurrentlyExpanded && allowToggle) {
          newExpanded = [];
        } else {
          newExpanded = [id];
        }
      } else {
        // Multiple mode: toggle the clicked item
        if (isCurrentlyExpanded && allowToggle) {
          newExpanded = expandedItems.filter((itemId) => itemId !== id);
        } else if (!isCurrentlyExpanded) {
          newExpanded = [...expandedItems, id];
        } else {
          newExpanded = expandedItems;
        }
      }

      // Update state
      if (!isControlled) {
        setInternalExpanded(newExpanded);
      }

      // Call onChange callback
      if (onChange) {
        onChange(newExpanded);
      }

      // Execute after callbacks with a delay to allow animation
      setTimeout(() => {
        if (isCurrentlyExpanded && onAfterCollapse) {
          onAfterCollapse(id);
        } else if (!isCurrentlyExpanded && onAfterExpand) {
          onAfterExpand(id);
        }
      }, transitionDuration);
    },
    [
      expandedItems,
      expandMode,
      allowToggle,
      isControlled,
      onChange,
      onBeforeExpand,
      onAfterExpand,
      onBeforeCollapse,
      onAfterCollapse,
      transitionDuration,
    ],
  );

  // Handle keyboard focus
  const handleFocus = useCallback((index: number) => {
    const itemElement = itemRefs.current[index];
    if (itemElement) {
      const button = itemElement.querySelector("button");
      button?.focus();
    }
  }, []);

  // Update refs array when items change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  const accordionClasses = combineClasses(
    styles.accordion,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    showDividers && styles.withDividers,
    disabled && styles.disabled,
    className,
  );

  // Empty state
  if (items.length === 0) {
    return (
      <div className={accordionClasses} {...rest}>
        {emptyState || (
          <div className={styles.emptyState}>No items to display</div>
        )}
      </div>
    );
  }

  return (
    <div className={accordionClasses} role="region" {...rest}>
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
        >
          <AccordionItem
            item={item}
            isExpanded={expandedItems.includes(item.id)}
            onToggle={handleToggle}
            variant={variant}
            size={size}
            expandIcon={expandIcon}
            iconPosition={iconPosition}
            disabled={disabled}
            elevateExpanded={elevateExpanded}
            transitionDuration={transitionDuration}
            index={index}
            totalItems={items.length}
            onItemFocus={handleFocus}
          />
        </div>
      ))}
    </div>
  );
};

export default Accordion;
