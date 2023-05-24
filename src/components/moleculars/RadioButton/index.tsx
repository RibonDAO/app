import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import S from "./styles";

type RadioProp = {
  id: number;
  name: string;
  value: string;
  icon: any;
};
type Props = {
  options: Array<RadioProp>;
  onOptionChanged: (option: RadioProp) => void;
};
function RadioButton({ options, onOptionChanged }: Props) {
  const [selectedOption, setSelectedOption] = useState<RadioProp>(options[0]);

  const handleOptionSelect = (option: React.SetStateAction<RadioProp>) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    onOptionChanged(selectedOption);
  }, [selectedOption]);

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id.toString()}
          onPress={() => handleOptionSelect(option)}
          style={S.buttonContainer}
        >
          <View style={S.leftContainer}>
            <View
              style={[
                S.radioCircle,
                selectedOption.value === option.value ? S.active : S.inactive,
              ]}
            />
            <Text style={S.buttonText}>{option.name}</Text>
          </View>
          <Image source={option.icon} style={S.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default RadioButton;
