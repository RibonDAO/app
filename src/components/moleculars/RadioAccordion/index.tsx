import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import S from "./styles";

type AccordionItem = {
  title: string;
  children?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: () => void;
};

export type Props = {
  current?: number;
  items: AccordionItem[];
};

function RadioAccordion({ current, items }: Props): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(current);

  useEffect(() => {
    if (!current) return;
    if (current > items.length - 1 || current < 0) return;

    setCurrentIndex(current);
  }, [current]);

  useEffect(() => {
    if (!currentIndex) return;

    const { onClick } = items[currentIndex];
    if (onClick) onClick();
  }, [currentIndex]);

  const onClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={S.container}>
      {items.map((item, index) => {
        const { title, children, rightIcon } = item;
        const isLast = index === items.length - 1;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            key={title}
            style={[S.radioListItem, isLast && S.lastItem]}
            onPress={() => onClick(index)}
          >
            <View style={S.radioRow}>
              <View style={S.titleContainer}>
                <View
                  style={[S.thumb, currentIndex === index && S.thumbSelected]}
                />
                <Text>{title}</Text>
              </View>
              <View>{rightIcon && rightIcon}</View>
            </View>
            {children && index === currentIndex && (
              <View style={S.radioContent}>{children}</View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default RadioAccordion;
