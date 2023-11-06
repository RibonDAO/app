/* eslint-disable react/no-array-index-key */
import React from "react";
import { Text } from "react-native";

export default function renderBoldText(text: string) {
  const parts = text.split(/<b>(.*?)<\/b>/g);

  return parts.map((part, index) => {
    if (index % 2 === 0) {
      return (
        <Text key={index} style={{ fontWeight: "bold" }}>
          {part}
        </Text>
      );
    } else {
      return (
        <Text style={{ fontWeight: "bold" }} key={index}>
          {part}
        </Text>
      );
    }
  });
}
