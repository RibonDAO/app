import { View, Text } from "react-native";
import usePageView from "hooks/usePageView";
import CardTicket from "components/moleculars/CardTicket";
import { theme } from "@ribon.io/shared";
import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import S from "./styles";

function DepoimentsSection(): JSX.Element {
  usePageView("P23_view");

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.clubScreen.depoimentsSection",
  });
  return (
    <View style={S.container}>
      <Text style={S.title}>{t("title")}</Text>
      <ScrollView horizontal style={S.innerContainer}>
        <CardTicket
          icon={undefined}
          title="texto"
          subtitle={{
            icon: undefined,
            text: "test",
            color: "",
          }}
          borderColor={theme.colors.brand.tertiary[25]}
        />
        <CardTicket
          icon={undefined}
          title="texto"
          subtitle={{
            icon: undefined,
            text: "test",
            color: "",
          }}
          borderColor={theme.colors.brand.tertiary[25]}
        />
      </ScrollView>
    </View>
  );
}

export default DepoimentsSection;
