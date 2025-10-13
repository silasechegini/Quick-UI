import { FC } from "react";
import { User } from "../Header.types";
import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";
import { ICONS } from "@assets/iconType";

interface HeaderAuthButtonsProps {
  showAuth?: boolean;
  user?: User;
  onLogin?: () => void;
  onCreateAccount?: () => void;
}

export const HeaderAuth: FC<HeaderAuthButtonsProps> = ({
  showAuth = true,
  user,
  onLogin,
  onCreateAccount,
}) => {
  if (!showAuth || user) return null;

  const authMenuItems = [
    {
      id: "login",
      label: "Log in",
      icon: ICONS.LOGIN_ICON,
      onClick: onLogin,
      disabled: false,
    },
    {
      id: "signup",
      label: "Sign up",
      icon: ICONS.SIGNUP_ICON,
      onClick: onCreateAccount,
      disabled: false,
    },
  ];

  return <HeaderHamburgerMenu hamburgerMenuItems={authMenuItems} />;
};
