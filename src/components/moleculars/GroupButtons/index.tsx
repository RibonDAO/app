import React, { useEffect, useState } from "react";
import { theme } from "@ribon.io/shared/styles";
import { View } from "react-native";
import S from "./styles";
import Button from "./Button";

export type Props = {
  elements: any[];
  onChange?: (element: any, index: number) => void;
  nameExtractor: (element: any) => string;
  indexSelected?: number;
  backgroundColor?: string;
  backgroundColorOutline?: string;
  textColor?: string;
  textColorOutline?: string;
  borderColor?: string;
  borderColorOutline?: string;
};

function GroupButtons({
  elements,
  onChange,
  nameExtractor,
  indexSelected,
  backgroundColor = theme.colors.brand.primary[800],
  backgroundColorOutline = "transparent",
  textColor = theme.colors.neutral10,
  textColorOutline = theme.colors.brand.primary[800],
  borderColor = theme.colors.brand.primary[800],
  borderColorOutline = theme.colors.brand.primary[800],
}: Props): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const handleElementClick = (index: number, element: any) => {
    setSelectedButtonIndex(index);
    if (onChange) onChange(element, index);
  };

  useEffect(() => {
    if (indexSelected !== undefined) {
      handleElementClick(indexSelected, elements[indexSelected]);
    }
  }, [indexSelected]);

  function renderGroupButtons() {
    return elements?.map((element, index) => (
      <Button
        outline={index !== selectedButtonIndex}
        onPress={() => handleElementClick(index, element)}
        // eslint-disable-next-line react/no-array-index-key
        key={index.toString()}
        backgroundColor={backgroundColor}
        backgroundColorOutline={backgroundColorOutline}
        borderColor={borderColor}
        borderColorOutline={borderColorOutline}
        text={nameExtractor(element)}
        textColor={textColor}
        textColorOutline={textColorOutline}
      />
    ));
  }

  return <View style={S.container}>{renderGroupButtons()}</View>;
}

export default GroupButtons;
