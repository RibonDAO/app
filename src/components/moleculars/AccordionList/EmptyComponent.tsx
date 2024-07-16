import { View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import HoldingHeartIcon from "components/vectors/HoldingHeartIcon";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
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
        customStyles={{ borderRadius: 12, borderWidth: 0 }}
        backgroundColor={theme.colors.brand.primary[600]}
        textColor={theme.colors.neutral10}
      />
    </S.EmptyComponentContainer>
  );
}
