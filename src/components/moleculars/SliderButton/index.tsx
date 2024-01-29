import { useState } from "react";
import Slider from "@react-native-community/slider";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import * as S from "./styles"; // Import styles from the separate file

type SliderButtonProps = {
  rangeSize: number;
  setValue: (value: number) => void;
};

function SliderButton({ rangeSize, setValue }: SliderButtonProps): JSX.Element {
  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (value: number) => {
    setSliderValue(Math.round(value));
    setValue(Math.round(value));
  };

  const handleButtonClick = (increment: number) => {
    const newValue = sliderValue + increment;
    if (newValue < 0 || newValue > rangeSize) return;
    setSliderValue(newValue);
    setValue(newValue);
  };

  const minusDisabled = sliderValue <= 1;
  const plusDisabled = sliderValue >= rangeSize;

  const minusBorderColor = minusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  const plusBorderColor = plusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  return (
    <S.Container>
      <S.Button
        onPress={() => handleButtonClick(-1)}
        disabled={minusDisabled}
        style={{ borderColor: minusBorderColor }}
        testID="removeButton"
      >
        <Icon
          type="outlined"
          name="remove"
          size={24}
          color={
            minusDisabled
              ? theme.colors.neutral[400]
              : theme.colors.brand.primary[600]
          }
        />
      </S.Button>
      <S.SliderContainer>
        <Slider
          style={{
            width: "100%",
            borderColor: theme.colors.brand.primary[600],
            paddingHorizontal: 16,
          }}
          minimumValue={rangeSize === 1 ? 0 : 1}
          maximumValue={rangeSize}
          step={1}
          minimumTrackTintColor={theme.colors.brand.primary[600]}
          maximumTrackTintColor={theme.colors.neutral[200]}
          thumbTintColor={theme.colors.brand.primary[600]}
          value={sliderValue}
          onValueChange={handleSliderChange}
          disabled={rangeSize === 1}
        />
      </S.SliderContainer>
      <S.Button
        testID="addButton"
        onPress={() => handleButtonClick(1)}
        disabled={plusDisabled}
        style={{ borderColor: plusBorderColor }}
      >
        <Icon
          type="outlined"
          name="add"
          size={24}
          color={
            plusDisabled
              ? theme.colors.neutral[400]
              : theme.colors.brand.primary[600]
          }
        />
      </S.Button>
    </S.Container>
  );
}

export default SliderButton;
