import React, { ComponentType } from "react";
import useNavigationReady from "hooks/useNavigationReady";

export function withPlaceholder<Props>(
  Component: ComponentType<Props>,
  Placeholder: ComponentType | null = null,
) {
  return function (props: Props & JSX.IntrinsicAttributes) {
    const navigationReady = useNavigationReady();

    return navigationReady ? (
      <Component {...props} />
    ) : (
      Placeholder && <Placeholder />
    );
  };
}
