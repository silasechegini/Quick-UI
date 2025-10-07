import { FC } from "react";
import { HeaderProps } from "./Header.types";
import {
  HeaderBrand,
  HeaderNavigation,
  HeaderAuth,
  HeaderUserSection,
  HeaderHamburgerMenu,
} from "./components";
import styles from "./styles.module.scss";

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
  onSettingsClick,
  actions,
  showAuth = true,
  showHamburgerMenu = true,
  hamburgerMenuItems = [],
  className,
  testId = "header",
}) => {
  const headerClasses = [
    styles.header,
    styles[`header--${variant}`],
    styles[`header--${position}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses} data-testid={testId}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <HeaderBrand
            logo={logo}
            brandName={brandName}
            onBrandClick={onBrandClick}
          />
          <HeaderNavigation navigationItems={navigationItems} />
        </div>

        {centerContent && (
          <div className={styles.centerSection}>{centerContent}</div>
        )}

        <div className={styles.rightSection}>
          {actions && <div className={styles.actions}>{actions}</div>}
          <HeaderAuth
            showAuth={showAuth}
            user={user}
            onLogin={onLogin}
            onCreateAccount={onCreateAccount}
          />
          <HeaderUserSection user={user} />
          <HeaderHamburgerMenu
            showHamburgerMenu={showHamburgerMenu}
            user={user}
            hamburgerMenuItems={hamburgerMenuItems}
            onProfileClick={onProfileClick}
            onSettingsClick={onSettingsClick}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
