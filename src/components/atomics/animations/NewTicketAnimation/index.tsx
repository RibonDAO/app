import Animated, { Keyframe } from "react-native-reanimated";
import Icon from "components/atomics/Icon";
import { theme } from "@ribon.io/shared";
import * as S from "./styles";

export type Props = {
  count: number;
};

export default function NewTicketAnimation({ count = 1 }: Props): JSX.Element {
  const keyframe = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateY: 100 }],
    },
    20: {
      opacity: 1,
      transform: [{ translateY: 80 }],
    },
    40: {
      opacity: 1,
      transform: [{ translateY: 60 }],
    },
    80: {
      opacity: 1,
      transform: [{ translateY: 40 }],
    },
    100: {
      opacity: 0,
      transform: [{ translateY: 20 }],
    },
  });

  return (
    <Animated.View entering={keyframe.duration(2000)}>
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
