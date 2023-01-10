import React from "react";
import { act, fireEvent, screen } from "@testing-library/react-native";

export async function waitForPromises() {
  // eslint-disable-next-line no-promise-executor-return
  await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
}

export function clickOn(textOrComponent: string | any) {
  if (typeof textOrComponent === "string") {
    return fireEvent.press(screen.getByText(textOrComponent));
  }

  return fireEvent.press(textOrComponent);
}
