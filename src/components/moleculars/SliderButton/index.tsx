import { useState } from "react";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import { Slider } from "@miblanchard/react-native-slider";
import * as S from "./styles";

type SliderButtonProps = {
  rangeSize: number;
  setValue: (value: number) => void;
  step: number;
};

function SliderButton({
  rangeSize,
  setValue,
  step,
}: SliderButtonProps): JSX.Element {
  const [sliderValue, setSliderValue] = useState(step);

  const handleSliderChange = (value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    setSliderValue(Math.round(newValue));
    setValue(Math.round(newValue));
  };

  const handleButtonClick = (increment: number) => {
    const newValue = sliderValue + increment;
    if (newValue < 0 || newValue > rangeSize) return;
    setSliderValue(newValue);
    setValue(newValue);
  };

  const minimumValue = rangeSize < 2 * step ? 0 : step;
  const maximumValue = Math.floor(rangeSize / step) * step;

  const minusDisabled = sliderValue <= step;
  const plusDisabled = sliderValue + step > rangeSize;

  const minusBorderColor = minusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  const plusBorderColor = plusDisabled
    ? theme.colors.neutral[400]
    : theme.colors.brand.primary[600];

  const thumbStyle = {
    backgroundColor: theme.colors.brand.primary[600],
    borderColor: theme.colors.neutral10,
    borderWidth: 2,
    height: 16,
    width: 16,
  };

  return (
    <S.Container>
      <S.Button
        onPress={() => handleButtonClick(-step)}
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
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          value={sliderValue}
          onValueChange={handleSliderChange}
          disabled={rangeSize < 2 * step}
          minimumTrackTintColor={theme.colors.brand.primary[600]}
          maximumTrackTintColor={theme.colors.neutral[200]}
          thumbStyle={thumbStyle}
        />
      </S.SliderContainer>
      <S.Button
        testID="addButton"
        onPress={() => handleButtonClick(step)}
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
