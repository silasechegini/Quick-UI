import { FC } from "react";
import { HEADER_POSITIONS, HEADER_VARIANTS, HeaderProps } from "./Header.types";
import {
  HeaderBrand,
  HeaderNavigation,
  HeaderAuth,
  HeaderUserSection,
  HeaderHamburgerMenu,
} from "./components";
import styles from "./styles.module.scss";

/**
 * Header component that provides a flexible navigation bar with branding, navigation, and user sections.
 * Supports multiple variants, responsive design, and hamburger menu functionality.
 *
 * @param props - The props for the Header component
 * @param props.variant - The visual style variant of the header (default: "default")
 * @param props.position - The positioning behavior of the header (default: "static")
 * @param props.logo - Logo element or image to display in the brand section
 * @param props.brandName - Brand name text to display next to the logo
 * @param props.onBrandClick - Callback function called when the brand/logo is clicked
 * @param props.navigationItems - Array of navigation items to display
 * @param props.centerContent - Content to display in the center of the header
 * @param props.user - User object containing user information
 * @param props.onLogin - Callback function called when login button is clicked
 * @param props.onLogout - Callback function called when logout is triggered
 * @param props.onCreateAccount - Callback function called when create account button is clicked
 * @param props.onProfileClick - Callback function called when profile is clicked
 * @param props.onSettingsClick - Callback function called when settings is clicked
 * @param props.actions - Additional action elements to display in the header
 * @returns JSX.Element representing the header component
 */
const Header: FC<HeaderProps> = ({
  variant = HEADER_VARIANTS.DEFAULT,
  position = HEADER_POSITIONS.STATIC,
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
