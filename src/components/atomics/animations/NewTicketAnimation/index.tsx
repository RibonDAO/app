import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import * as S from "./styles";

export type Props = {
  count: number;
};

export default function NewTicketAnimation({ count = 1 }: Props): JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 160,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(translateY, {
        toValue: -30,
        duration: 480,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -40,
          duration: 160,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY }] }}
    >
      <S.Container>
        <S.Count>+{count}</S.Count>
        <Icon
          type="outlined"
          name="confirmation_number"
          size={24}
          color={theme.colors.brand.primary[500]}
        />
      </S.Container>
    </Animated.View>
  );
}
