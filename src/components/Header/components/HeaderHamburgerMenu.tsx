import { FC, useState } from "react";
import { Button, BUTTON_VARIANTS } from "../../Button";
import { HamburgerMenuItem, User } from "../Header.types";
import styles from "../styles.module.scss";
import { Icon, IconName } from "@components/index";
import { ICONS } from "@assets/iconType";

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
          icon: ICONS.USER_ICON,
          onClick: onProfileClick,
          disabled: false,
        },
        {
          id: "settings",
          label: "Settings",
          icon: ICONS.SETTINGS_ICON,
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
                tabIndex={0}
                fullWidth
              >
                <div className={styles.menuItemContainer}>
                  {item.icon && <Icon name={item.icon as IconName} size={16} />}
                  {item.label}
                </div>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
