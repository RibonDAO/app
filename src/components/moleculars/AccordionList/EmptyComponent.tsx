import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import HoldingHeartIcon from "components/vectors/HoldingHeartIcon";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

export function EmptyComponent() {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection.emptyComponent",
  });
  const { navigateTo } = useNavigation();

  return (
    <S.EmptyComponentContainer>
      <HoldingHeartIcon />
      <View>
        <S.EmptyComponentText>{t("firstParagraph")}</S.EmptyComponentText>
        <S.EmptyComponentText>{t("secondParagraph")}</S.EmptyComponentText>
      </View>
      <Button
        text={t("button")}
        onPress={() => navigateTo("TabNavigator", { screen: "CausesScreen" })}
      />
    </S.EmptyComponentContainer>
  );
}
