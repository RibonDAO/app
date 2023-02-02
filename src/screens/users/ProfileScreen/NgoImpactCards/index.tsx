import { Text, View } from "react-native";
import { useCallback } from "react";
import { useImpact } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTranslation } from "react-i18next";
import { Impact } from "@ribon.io/shared/types";
import NgoImpactCard from "../NgoImpactCard";
import NgoImpactImage from "./assets/NgoImpactImage";
import S from "./styles";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared";

function NgoImpactCards(): JSX.Element {
  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);
  const { t } = useTranslation("translation", {
    keyPrefix: "users.profileScreen.ngoImpactCards",
  });

  const impactItems = useCallback(
    () => userImpact?.filter((item) => item.impact.toString() !== "0") || [],
    [userImpact],
  );

  const hasImpact = useCallback(
    () => impactItems()?.length > 0,
    [impactItems],
  );

  function renderEmptyImpact() {
    return (
      <View style={S.emptyImpactContainer}>
        <NgoImpactImage />
        <Text style={S.emptyImpactTitle}>{t("title")}</Text>
        <Text style={S.emptyImpactDescription}>{t("description")}</Text>
        <Button textColor={theme.colors.green40} text={t("buttonText")} onPress={() => { }} />
      </View>
    )
  }

  return (
    <View style={S.cardsContainer}>
      {hasImpact() ?
        impactItems()?.map((item: Impact) => (
          <NgoImpactCard
            key={item?.nonProfit.id}
            description={`${item.impact} de ${item.nonProfit.impactDescription} para ${item.nonProfit.name}`}
            name={item?.nonProfit.name}
            icon={item?.nonProfit.logo}
            onPress={() => { }}
          />)
        ) : renderEmptyImpact()
      }
    </View>
  );
}

export default NgoImpactCards;
