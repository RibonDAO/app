import { NonProfit } from "@ribon.io/shared/types";
import { useTranslation } from "react-i18next";
import ZeroDonationsSection from "screens/users/ImpactScreen/ZeroDonationsSection";
import { useNavigation } from "hooks/useNavigation";
import ImpactDonationsVector from "screens/users/ImpactScreen/CommunityDonationsImpactCards/ImpactDonationsVector";

import { FlatList, SafeAreaView } from "react-native";
import { useTagDonationContext } from "contexts/tagDonationContext";
import * as S from "./styles";
import NonProfitCarousel from "./NonProfitCarousel";

export type Props = {
  nonProfits: NonProfit[];
  setUnauthorizedModalVisible: (value: boolean) => void;
};

export default function NonProfitsList({
  nonProfits,
  setUnauthorizedModalVisible,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { navigateTo } = useNavigation();
  const { nonProfitsTag } = useTagDonationContext();

  return nonProfits.length ? (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={nonProfits}
        renderItem={({ item }) => (
          <NonProfitCarousel
            nonProfit={item}
            show={nonProfitsTag?.map((np) => np.id).includes(item.id) ?? false}
            setUnauthorizedModalVisible={setUnauthorizedModalVisible}
          />
        )}
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
