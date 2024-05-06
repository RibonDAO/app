import ArrowLeft from "components/vectors/ArrowLeft";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import * as S from "./styles";

export function ArrowBackButton() {
  const { popNavigation } = useNavigation();
  const handleBackButtonClick = () => {
    popNavigation();
  };
  return (
    <S.Arrow>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={handleBackButtonClick}
        testID="arrow-back-button"
      >
        <ArrowLeft />
      </TouchableOpacity>
    </S.Arrow>
  );
}
