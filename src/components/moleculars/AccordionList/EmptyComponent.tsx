import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import HoldingHeartIcon from "components/vectors/HoldingHeartIcon";
import Button from "components/atomics/buttons/Button";
import * as S from "./styles";

export function EmptyComponent() {
  const { navigateTo } = useNavigation();

  return (
    <S.EmptyComponentContainer>
      <HoldingHeartIcon />
      <View>
        <S.EmptyComponentText>
          Suas doações aparecerão aqui.
        </S.EmptyComponentText>
        <S.EmptyComponentText>
          Doe seu primeiro ticket e comece a construir seu impacto!
        </S.EmptyComponentText>
      </View>
      <Button
        text="Doar tickets"
        onPress={() => navigateTo("TabNavigator", { screen: "CausesScreen" })}
      />
    </S.EmptyComponentContainer>
  );
}
