import React, { FC, useState } from "react";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "../Button";
import { HeaderProps } from "./Header.types";
import { iconSvgMapping } from "../../assets";
import styles from "./styles.module.scss";

const UserIcon = iconSvgMapping["user_icon"];

const Header: FC<HeaderProps> = ({
  variant = "default",
  position = "static",
  logo,
  brandName,
  onBrandClick,
  navigationItems,
  centerContent,
  user,
  onLogin,
  onLogout,
  onCreateAccount,
  onProfileClick,
  actions,
  showAuth = true,
  showHamburgerMenu = true,
  hamburgerMenuItems = [],
  className,
  testId = "header",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const headerClasses = [
    styles.header,
    styles[`header--${variant}`],
    styles[`header--${position}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleBrandClick = () => {
    if (onBrandClick) {
      onBrandClick();
    }
  };

  const renderBrand = () => {
    if (!logo && !brandName) return null;

    const brandContent = (
      <>
        {logo && <div className={styles.logo}>{logo}</div>}
        {brandName && <h1 className={styles.brandName}>{brandName}</h1>}
      </>
    );

    if (onBrandClick) {
      return (
        <Button
          variant={BUTTON_VARIANTS.TERTIARY}
          className={styles.brand}
          onClick={handleBrandClick}
          aria-label={`Go to ${brandName || "home"}`}
        >
          {brandContent}
        </Button>
      );
    }

    return <div className={styles.brand}>{brandContent}</div>;
  };

  const renderNavigation = () => {
    if (!navigationItems) return null;

    return <nav className={styles.navigation}>{navigationItems}</nav>;
  };

  const renderAuthButtons = () => {
    if (!showAuth || user) return null;

    return (
      <div className={styles.authButtons}>
        <Button
          variant={BUTTON_VARIANTS.TERTIARY}
          size={BUTTON_SIZES.SMALL}
          onClick={onLogin}
        >
          Log in
        </Button>
        <Button
          variant={BUTTON_VARIANTS.PRIMARY}
          size={BUTTON_SIZES.SMALL}
          onClick={onCreateAccount}
        >
          Sign up
        </Button>
      </div>
    );
  };

  const renderUserSection = () => {
    if (!user) return null;

    return (
      <div className={styles.userDisplay}>
        <div className={styles.userInfo}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <UserIcon />
            </div>
          )}
          <span className={styles.userName}>{user.name}</span>
        </div>
      </div>
    );
  };

  const renderHamburgerMenu = () => {
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
            onClick: () => console.log("Settings clicked"),
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
                      {iconSvgMapping[
                        item.icon as keyof typeof iconSvgMapping
                      ] &&
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

  return (
    <header className={headerClasses} data-testid={testId}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          {renderBrand()}
          {renderNavigation()}
        </div>

        {centerContent && (
          <div className={styles.centerSection}>{centerContent}</div>
        )}

        <div className={styles.rightSection}>
          {actions && <div className={styles.actions}>{actions}</div>}
          {renderAuthButtons()}
          {renderUserSection()}
          {renderHamburgerMenu()}
        </div>
      </div>
    </header>
  );
};

export default Header;
