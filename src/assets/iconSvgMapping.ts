import { FC, SVGProps } from "react";
import { ReactComponent as searchIcon } from "./icons/search.svg";
import { ReactComponent as closeIcon } from "./icons/close.svg";
import { ReactComponent as chevronDownIcon } from "./icons/chevron_down.svg";
import { ReactComponent as chevronUpIcon } from "./icons/chevron_up.svg";
import { ReactComponent as chevronLeftIcon } from "./icons/chevron_left.svg";
import { ReactComponent as chevronRightIcon } from "./icons/chevron_right.svg";
import { ReactComponent as dropdownArrowIcon } from "./icons/dropdown_arrow.svg";
import { ReactComponent as clearIcon } from "./icons/clear.svg";
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
import { IconKey } from "./iconType";

const iconSvgMapping: { [key in IconKey]: FC<SVGProps<SVGSVGElement>> } = {
  search_icon: searchIcon,
  close_icon: closeIcon,
  chevron_down_icon: chevronDownIcon,
  chevron_up_icon: chevronUpIcon,
  chevron_left_icon: chevronLeftIcon,
  chevron_right_icon: chevronRightIcon,
  dropdown_arrow_icon: dropdownArrowIcon,
  clear_icon: clearIcon,
  plus_icon: plusIcon,
  minus_icon: minusIcon,
  checkmark_icon: checkmarkIcon,
  spinner_icon: spinnerIcon,
  loading_icon: loadingIcon,
  calendar_icon: calendarIcon,
  clock_icon: clockIcon,
  eye_icon: eyeIcon,
  eye_off_icon: eyeOffIcon,
  upload_icon: uploadIcon,
  download_icon: downloadIcon,
  settings_icon: settingsIcon,
  trash_icon: trashIcon,
  user_icon: userIcon,
  login_icon: loginIcon,
  signup_icon: signupIcon,
  dashboard_icon: dashboardIcon,
  analytics_icon: analyticsIcon,
  teams_icon: teamsIcon,
  thunderbolt_logo_icon: thunderboltLogoIcon,
  thunderbolt_circle_logo_icon: thunderboltCircleLogoIcon,
  thunderbolt_cloud_logo_icon: thunderboltCloudLogoIcon,
};

export default iconSvgMapping;
