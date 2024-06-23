import ArrowLeft from "components/vectors/ArrowLeft";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import * as S from "./styles";

type ArrowBackButtonProps = {
  color?: string;
  onPress?: () => void;
};
export function ArrowBackButton({ color, onPress }: ArrowBackButtonProps) {
  const { popNavigation } = useNavigation();

  const handleBackButtonClick = () => {
    if (onPress) {
      onPress();
    } else {
      popNavigation();
    }
  };

  return (
    <S.Arrow>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={handleBackButtonClick}
        testID="arrow-back-button"
      >
        <ArrowLeft color={color} />
      </TouchableOpacity>
    </S.Arrow>
  );
}
