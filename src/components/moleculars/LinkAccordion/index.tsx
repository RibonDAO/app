import { theme } from "@ribon.io/shared";
import Icon from "components/atomics/Icon";
import { Text, TouchableOpacity, View } from "react-native";
import S from "./styles";

type AccordionItem = {
  title: string;
  leftIcon?: string;
  handleClick: (index: number) => void;
};

export type Props = {
  items: AccordionItem[];
};

function LinkAccordion({ items }: Props): JSX.Element {
  return (
    <View style={S.container}>
      {items.map((item, index) => {
        const { title, leftIcon, handleClick } = item;
        const isLast = index === items.length - 1;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            key={title}
            style={[S.linkListItem, isLast && S.lastItem]}
            onPress={() => handleClick(index)}
          >
            <View style={S.linkRow}>
              <View style={S.titleContainer}>
                <>
                  {leftIcon && (
                    <Icon
                      name={leftIcon}
                      size={25}
                      color={theme.colors.brand.primary[600]}
                      type="outlined"
                    />
                  )}
                  <Text style={S.title}>{title}</Text>
                </>
              </View>

              <View style={S.rightElement}>
                <Icon
                  type="outlined"
                  name="arrow_forward"
                  size={25}
                  color={theme.colors.brand.primary[900]}
                  style={S.rightIcon}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default LinkAccordion;
