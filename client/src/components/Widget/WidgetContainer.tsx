import React from "react";

import { Spinner } from "./../../components";

interface WidgetContainerProps {
  isLoading?: boolean;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  isLoading,
}) => (isLoading ? <Spinner /> : <>{children}</>);

WidgetContainer.defaultProps = { isLoading: false };
