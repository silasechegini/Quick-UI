import { FC } from "react";
import { User } from "../Header.types";
import { HeaderHamburgerMenu } from "./HeaderHamburgerMenu";

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
      icon: "login_icon",
      onClick: onLogin,
      disabled: false,
    },
    {
      id: "signup",
      label: "Sign up",
      icon: "signup_icon",
      onClick: onCreateAccount,
      disabled: false,
    },
  ];

  return <HeaderHamburgerMenu hamburgerMenuItems={authMenuItems} />;
};
