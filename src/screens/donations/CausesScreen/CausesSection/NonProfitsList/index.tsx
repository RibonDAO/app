import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import ZeroDonationsSection from "screens/users/ImpactScreen/ZeroDonationsSection";
import { useNavigation } from "hooks/useNavigation";
import ImpactDonationsVector from "assets/illustrations/ImpactDonationsVector";

import { FlatList, SafeAreaView } from "react-native";
import * as S from "./styles";
import NonProfitCarousel from "./NonProfitCarousel";

export type Props = {
  nonProfits: NonProfit[];
};

export default function NonProfitsList({ nonProfits }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { navigateTo } = useNavigation();

  return nonProfits.length ? (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={nonProfits}
        renderItem={({ item }) => <NonProfitCarousel nonProfit={item} />}
        keyExtractor={(nonProfit) => nonProfit.id.toString()}
      />
    </SafeAreaView>
  ) : (
    <S.NotFoundContainer>
      <ZeroDonationsSection
        title={t("noCauses.title")}
        onButtonPress={() => navigateTo("ClubScreen")}
        description={t("noCauses.text")}
        buttonText={t("noCauses.button")}
        image={<ImpactDonationsVector />}
      />
    </S.NotFoundContainer>
  );
}
