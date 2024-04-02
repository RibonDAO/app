import { NonProfit } from "@ribon.io/shared";
import CardCenterImageButton from "components/moleculars/CardCenterImageButton";
import { View } from "react-native";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import { useTranslation } from "react-i18next";
import S from "../styles";

interface NonProfitCardProps {
  nonProfit: NonProfit;
  index: number;
  hasTickets: boolean;
  handleNonProfitImagePress: (nonProfit: any) => void;
  handleButtonPress: (nonProfit: any) => void;
  isLast: boolean;
}

function NonProfitCard({
  nonProfit,
  index,
  hasTickets,
  handleNonProfitImagePress,
  handleButtonPress,
  isLast,
}: NonProfitCardProps) {
  const { formattedImpactText } = useFormattedImpactText();
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const nonProfitStylesFor = () => {
    const isFirst = index === 0;

    return {
      marginLeft: isFirst ? 16 : 4,
      marginRight: isLast ? 16 : 4,
      ...S.causesCardContainer,
    };
  };

  return (
    <View style={nonProfitStylesFor()} key={nonProfit.id}>
      <CardCenterImageButton
        image={nonProfit.mainImage}
        infoTextTop={nonProfit.name}
        infoTextBottom={nonProfit.cause.name}
        imageDescription={formattedImpactText(
          nonProfit,
          undefined,
          false,
          false,
          undefined,
          t("impactPrefix") || "",
        )}
        buttonText={hasTickets ? t("buttonText") : t("noTickets")}
        onImagePress={() => {
          handleNonProfitImagePress(nonProfit);
        }}
        onClickButton={() => handleButtonPress(nonProfit)}
        buttonDisabled={!hasTickets}
        labelText={t("labelText") || ""}
      />
    </View>
  );
}

export default NonProfitCard;
