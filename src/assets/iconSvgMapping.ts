import { FC, SVGProps } from "react";
import { ReactComponent as searchIcon } from "./icons/search.svg";
import { ReactComponent as closeIcon } from "./icons/close.svg";
import { ReactComponent as chevronDownIcon } from "./icons/chevron_down.svg";
import { ReactComponent as chevronUpIcon } from "./icons/chevron_up.svg";
import { ReactComponent as chevronLeftIcon } from "./icons/chevron_left.svg";
import { ReactComponent as chevronRightIcon } from "./icons/chevron_right.svg";
import { ReactComponent as dropdownArrowIcon } from "./icons/dropdown_arrow.svg";
import { ReactComponent as clearIcon } from "./icons/clear.svg";
import { ReactComponent as copyIcon } from "./icons/copy.svg";
import { ReactComponent as plusIcon } from "./icons/plus.svg";
import { ReactComponent as minusIcon } from "./icons/minus.svg";
import { ReactComponent as checkmarkIcon } from "./icons/checkmark.svg";
import { ReactComponent as spinnerIcon } from "./icons/spinner.svg";
import { ReactComponent as loadingIcon } from "./icons/loading.svg";
import { ReactComponent as calendarIcon } from "./icons/calendar.svg";
import { ReactComponent as clockIcon } from "./icons/clock.svg";
import { ReactComponent as eyeIcon } from "./icons/eye.svg";
import { ReactComponent as eyeOffIcon } from "./icons/eye_off.svg";
import { ReactComponent as uploadIcon } from "./icons/upload.svg";
import { ReactComponent as downloadIcon } from "./icons/download.svg";
import { ReactComponent as settingsIcon } from "./icons/settings.svg";
import { ReactComponent as trashIcon } from "./icons/trash.svg";
import { ReactComponent as userIcon } from "./icons/user.svg";
import { ReactComponent as loginIcon } from "./icons/login.svg";
import { ReactComponent as signupIcon } from "./icons/signup.svg";
import { ReactComponent as dashboardIcon } from "./icons/dashboard.svg";
import { ReactComponent as analyticsIcon } from "./icons/analytics.svg";
import { ReactComponent as teamsIcon } from "./icons/teams.svg";
import { ReactComponent as thunderboltLogoIcon } from "./icons/thunderbolt-logo.svg";
import { ReactComponent as thunderboltCircleLogoIcon } from "./icons/thunderbolt-circle-logo.svg";
import { ReactComponent as thunderboltCloudLogoIcon } from "./icons/thunderbolt-cloud-logo.svg";
import { ReactComponent as exclamationIcon } from "./icons/exclamation.svg";
import { ReactComponent as bellIcon } from "./icons/bell.svg";
import { ReactComponent as mailIcon } from "./icons/mail.svg";
import { ReactComponent as mailOpenIcon } from "./icons/mail_open.svg";
import { ReactComponent as shoppingCartIcon } from "./icons/shopping_cart.svg";
import { IconKey } from "./iconType";

const iconSvgMapping: { [key in IconKey]: FC<SVGProps<SVGSVGElement>> } = {
  analytics_icon: analyticsIcon,
  bell_icon: bellIcon,
  calendar_icon: calendarIcon,
  checkmark_icon: checkmarkIcon,
  chevron_down_icon: chevronDownIcon,
  chevron_left_icon: chevronLeftIcon,
  chevron_right_icon: chevronRightIcon,
  chevron_up_icon: chevronUpIcon,
  clear_icon: clearIcon,
  close_icon: closeIcon,
  clock_icon: clockIcon,
  copy_icon: copyIcon,
  dashboard_icon: dashboardIcon,
  download_icon: downloadIcon,
  dropdown_arrow_icon: dropdownArrowIcon,
  exclamation_icon: exclamationIcon,
  eye_icon: eyeIcon,
  eye_off_icon: eyeOffIcon,
  loading_icon: loadingIcon,
  login_icon: loginIcon,
  mail_icon: mailIcon,
  mail_open_icon: mailOpenIcon,
  minus_icon: minusIcon,
  plus_icon: plusIcon,
  search_icon: searchIcon,
  settings_icon: settingsIcon,
  shopping_cart_icon: shoppingCartIcon,
  signup_icon: signupIcon,
  spinner_icon: spinnerIcon,
  teams_icon: teamsIcon,
  trash_icon: trashIcon,
  thunderbolt_circle_logo_icon: thunderboltCircleLogoIcon,
  thunderbolt_cloud_logo_icon: thunderboltCloudLogoIcon,
  thunderbolt_logo_icon: thunderboltLogoIcon,
  upload_icon: uploadIcon,
  user_icon: userIcon,
};

export default iconSvgMapping;
