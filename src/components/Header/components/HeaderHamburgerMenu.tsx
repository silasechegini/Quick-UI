import { FC, useState, ReactNode } from "react";
import { Button, BUTTON_VARIANTS } from "../../Button";
import { HamburgerMenuItem, User } from "../Header.types";
import styles from "../styles.module.scss";
import { Icon } from "@components/index";
import { ICONS } from "@assets/iconType";
import type { IconKey } from "@assets/iconType";

const isIconKey = (icon: IconKey | ReactNode): icon is IconKey => {
  return typeof icon === "string";
};

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
                  {item.icon &&
                    (isIconKey(item.icon) ? (
                      <Icon name={item.icon} size={16} />
                    ) : (
                      item.icon
                    ))}
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
