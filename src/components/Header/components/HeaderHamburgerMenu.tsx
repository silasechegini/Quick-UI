import React, { FC, useState } from "react";
import { Button, BUTTON_VARIANTS } from "../../Button";
import { iconSvgMapping } from "../../../assets";
import { HamburgerMenuItem, User } from "../Header.types";
import styles from "../styles.module.scss";

interface HeaderHamburgerMenuProps {
  showHamburgerMenu?: boolean;
  user?: User;
  hamburgerMenuItems?: HamburgerMenuItem[];
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
}

export const HeaderHamburgerMenu: FC<HeaderHamburgerMenuProps> = ({
  showHamburgerMenu = true,
  user,
  hamburgerMenuItems = [],
  onProfileClick,
  onSettingsClick,
  onLogout,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  if (!showHamburgerMenu && !user) return null;

  // Create default menu items if none provided
  const defaultItems = user
    ? [
        {
          id: "profile",
          label: "Profile",
          icon: "user_icon",
          onClick: onProfileClick,
          disabled: false,
        },
        {
          id: "settings",
          label: "Settings",
          icon: "settings_icon",
          onClick: onSettingsClick,
          disabled: false,
        },
        {
          id: "divider",
          label: "",
          divider: true,
        },
        {
          id: "logout",
          label: "Log out",
          onClick: onLogout,
          disabled: false,
        },
      ]
    : [];

  const menuItems =
    hamburgerMenuItems.length > 0 ? hamburgerMenuItems : defaultItems;

  if (menuItems.length === 0) return null;

  return (
    <div className={styles.hamburgerContainer}>
      <Button
        variant={BUTTON_VARIANTS.TERTIARY}
        className={styles.hamburgerTrigger}
        onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        aria-expanded={isHamburgerOpen}
        aria-haspopup="menu"
        aria-label="Menu"
      >
        <div className={styles.hamburgerIcon}>
          <span
            className={`${styles.hamburgerLine} ${isHamburgerOpen ? styles.hamburgerLineOpen : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isHamburgerOpen ? styles.hamburgerLineOpen : ""}`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${isHamburgerOpen ? styles.hamburgerLineOpen : ""}`}
          ></span>
        </div>
      </Button>

      {isHamburgerOpen && (
        <div className={styles.hamburgerDropdown} role="menu">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return (
                <hr key={item.id || index} className={styles.menuDivider} />
              );
            }

            return (
              <Button
                key={item.id}
                variant={BUTTON_VARIANTS.TERTIARY}
                className={styles.hamburgerMenuItem}
                onClick={() => {
                  item.onClick?.();
                  setIsHamburgerOpen(false);
                }}
                disabled={item.disabled || false}
                role="menuitem"
              >
                {item.icon && (
                  <div className={styles.menuItemIcon}>
                    {iconSvgMapping[item.icon as keyof typeof iconSvgMapping] &&
                      React.createElement(
                        iconSvgMapping[
                          item.icon as keyof typeof iconSvgMapping
                        ],
                        {
                          width: 16,
                          height: 16,
                        },
                      )}
                  </div>
                )}
                {item.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
