import { FC } from "react";
import { Header } from "../../Header";
import { PageHeaderConfig } from "../Page.types";

interface PageHeaderWrapperProps {
  header?: PageHeaderConfig;
  testId?: string;
}

export const PageHeaderWrapper: FC<PageHeaderWrapperProps> = ({
  header = { show: true },
  testId = "page",
}) => {
  if (!header?.show) return null;

  return <Header {...header} testId={`${testId}-header`} />;
};
