import { theme } from "@ribon.io/shared";
import Icon from "components/atomics/Icon";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import S from "./styles";

type AccordionItem = {
  title: string;
  leftIcon?: string;
  handleClick?: (index: number) => void;
  children?: JSX.Element;
  rightIcon?: JSX.Element;
  onClick?: () => void;
  show?: boolean | null;
};

export type Props = {
  current?: number;
  items: AccordionItem[];
  isRadio?: boolean;
};

function LinkAccordion({ current, items, isRadio }: Props): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(current);

  useEffect(() => {
    if (!isRadio) return;
    if (!current) return;
    if (current > items.length - 1 || current < 0) return;

    setCurrentIndex(current);
  }, [current]);

  useEffect(() => {
    if (!isRadio) return;
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
        if (item?.show === false) return null;

        const { title, leftIcon, handleClick, children, rightIcon } = item;
        const isLast = index === items.length - 1;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            key={title}
            style={[S.linkListItem, isLast && S.lastItem]}
            onPress={() =>
              !isRadio && handleClick ? handleClick(index) : onClick(index)
            }
          >
            <View style={S.linkRow}>
              <View style={S.titleContainer}>
                {isRadio ? (
                  <>
                    <View
                      style={[
                        S.thumb,
                        currentIndex === index && S.thumbSelected,
                      ]}
                    />
                    <Text>{title}</Text>
                  </>
                ) : (
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
                )}
              </View>
              {isRadio && rightIcon && <View>{rightIcon}</View>}
              {!isRadio && (
                <View style={S.rightElement}>
                  <Icon
                    type="outlined"
                    name="arrow_forward"
                    size={25}
                    color={theme.colors.brand.primary[900]}
                    style={S.rightIcon}
                  />
                </View>
              )}
            </View>
            {isRadio && children && index === currentIndex && (
              <View style={S.linkContent}>{children}</View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default LinkAccordion;
