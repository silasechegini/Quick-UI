import { ReactComponent as searchIcon } from "./icons/search.svg";
import { ReactComponent as closeIcon } from "./icons/close.svg";
import { ReactComponent as chevronDownIcon } from "./icons/chevron-down.svg";
import { ReactComponent as chevronUpIcon } from "./icons/chevron-up.svg";
import { ReactComponent as chevronLeftIcon } from "./icons/chevron-left.svg";
import { ReactComponent as chevronRightIcon } from "./icons/chevron-right.svg";
import { ReactComponent as dropdownArrowIcon } from "./icons/dropdown-arrow.svg";
import { ReactComponent as clearIcon } from "./icons/clear.svg";
import { ReactComponent as plusIcon } from "./icons/plus.svg";
import { ReactComponent as minusIcon } from "./icons/minus.svg";
import { ReactComponent as checkmarkIcon } from "./icons/checkmark.svg";
import { ReactComponent as spinnerIcon } from "./icons/spinner.svg";
import { ReactComponent as calendarIcon } from "./icons/calendar.svg";
import { ReactComponent as clockIcon } from "./icons/clock.svg";
import { ReactComponent as eyeIcon } from "./icons/eye.svg";
import { ReactComponent as eyeOffIcon } from "./icons/eye_off.svg";
import { ReactComponent as uploadIcon } from "./icons/upload.svg";
import { ReactComponent as downloadIcon } from "./icons/download.svg";
import { ReactComponent as settingsIcon } from "./icons/settings.svg";
import { ReactComponent as trashIcon } from "./icons/trash.svg";
import { ReactComponent as userIcon } from "./icons/user.svg";
import { FC } from "react";

type IconKey =
  | "search_icon"
  | "close_icon"
  | "chevron_down_icon"
  | "chevron_up_icon"
  | "chevron_left_icon"
  | "chevron_right_icon"
  | "dropdown_arrow_icon"
  | "clear_icon"
  | "plus_icon"
  | "minus_icon"
  | "checkmark_icon"
  | "spinner_icon"
  | "calendar_icon"
  | "clock_icon"
  | "eye_icon"
  | "eye_off_icon"
  | "upload_icon"
  | "download_icon"
  | "settings_icon"
  | "trash_icon"
  | "user_icon";

const iconSvgMapping: Record<IconKey, FC<React.SVGProps<SVGSVGElement>>> = {
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
  calendar_icon: calendarIcon,
  clock_icon: clockIcon,
  eye_icon: eyeIcon,
  eye_off_icon: eyeOffIcon,
  upload_icon: uploadIcon,
  download_icon: downloadIcon,
  settings_icon: settingsIcon,
  trash_icon: trashIcon,
  user_icon: userIcon,
};

export default iconSvgMapping;
