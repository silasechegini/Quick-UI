import { FC } from "react";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "../../Button";
import styles from "../styles.module.scss";
import { User } from "../Header.types";

interface HeaderAuthButtonsProps {
  showAuth?: boolean;
  user?: User;
  onLogin?: () => void;
  onCreateAccount?: () => void;
}

export const HeaderAuthButtons: FC<HeaderAuthButtonsProps> = ({
  showAuth = true,
  user,
  onLogin,
  onCreateAccount,
}) => {
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
