import { theme } from "@ribon.io/shared/styles";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Icon from "components/atomics/Icon";
import styles from "./styles";

export type Props = {
  text: string;
  sectionStyle?: any;
  lineThroughOnChecked?: boolean;
  navigationCallback?: () => void;
  checkedColor?: string;
  unCheckedColor?: string;
  onChecked?: () => void;
  disabled?: boolean;
  checked?: boolean;
};

function CheckBox({
  text,
  lineThroughOnChecked = false,
  sectionStyle = {},
  navigationCallback,
  checkedColor = theme.colors.brand.primary[900],
  unCheckedColor = theme.colors.brand.primary[300],
  onChecked,
  disabled,
  checked = false,
}: Props): JSX.Element {
  const [isChecked, setChecked] = useState(checked);

  const onPressHandler = () => {
    if (!disabled) {
      setChecked(!isChecked);
    }

    if (navigationCallback) {
      navigationCallback();
    }

    if (onChecked) {
      onChecked();
    }
  };

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const { primary } = theme.colors.brand;
  const { neutral10 } = theme.colors;

  return (
    <View style={{ ...styles.container, ...sectionStyle }}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onPressHandler}
        activeOpacity={1}
        style={styles.checkboxContainer}
      >
        <View
          style={{
            ...styles.checkbox,
            backgroundColor: isChecked ? checkedColor : neutral10,
            borderColor: isChecked ? checkedColor : unCheckedColor,
          }}
        >
          {isChecked && (
            <Icon
              type="outlined"
              name="check"
              size={20}
              style={{ marginTop: -3, marginLeft: -1 }}
              color={isChecked ? neutral10 : primary[300]}
            />
          )}
        </View>
        <Text
          style={{
            ...styles.paragraph,
            textDecorationLine:
              isChecked && lineThroughOnChecked ? "line-through" : "none",
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
      {navigationCallback && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigationCallback()}
          activeOpacity={0.5}
          style={styles.navigationButton}
        >
          <Icon
            type="outlined"
            name="arrow_forward_ios"
            size={12}
            color={theme.colors.brand.primary[500]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default CheckBox;
