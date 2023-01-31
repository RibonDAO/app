import React, { ComponentType } from "react";
import useNavigationReady from "hooks/useNavigationReady";

export function withPlaceholderScreen<Props extends JSX.IntrinsicAttributes>(
  Component: ComponentType<Props>,
  Placeholder: ComponentType | null = null,
) {
  return function (props: Props) {
    const navigationReady = useNavigationReady();

    return navigationReady ? (
      <Component {...props} />
    ) : (
      Placeholder && <Placeholder />
    );
  };
}
