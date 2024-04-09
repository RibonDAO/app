import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useTicketsContext } from "contexts/ticketsContext";
import Button from "components/atomics/buttons/Button";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared";
import AddIcon from "assets/icons/AddIcon";
import { useIntegrationContext } from "contexts/integrationContext";
import usePageView from "hooks/usePageView";
import { Image } from "react-native";
import S from "./styles";
import Ticket from "./assets/Ticket";
import { Logo } from "./assets/Logo";

export default function GiveTicketV2Screen() {
  usePageView("P34_view");
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketV2Screen",
  });

  const { navigateTo } = useNavigation();

  const { ticketsCounter } = useTicketsContext();
  const { currentIntegrationId, integration } = useIntegrationContext();

  const receiveTicket = () => {
    logEvent("P34_getTicketBtn_click");
    navigateTo("CausesScreen");
  };

  const renderTitle = () => {
    const integrationName = integration?.name;

    if (currentIntegrationId) {
      if (ticketsCounter > 1)
        return t("integrationTitlePlural", {
          ticketsCounter,
          integrationName,
        });

      return t("integrationTitle", { integrationName });
    }

    if (ticketsCounter > 1) return t("titlePlural", { ticketsCounter });

    return t("title");
  };
  return (
    <View style={S.container}>
      <View style={S.logoContainer}>
        <View style={S.logoItem}>
          <Logo />
        </View>
        {integration?.logo && (
          <>
            <AddIcon width={12} height={12} />
            <View style={S.logoItem}>
              <Image
                source={{ uri: integration.logo }}
                style={{ width: 24, height: 24, resizeMode: "cover" }}
                accessibilityIgnoresInvertColors
              />
            </View>
          </>
        )}
      </View>
      <View style={S.content}>
        <View>
          <Ticket />
        </View>
        <View style={S.textContainer}>
          <Text style={S.title}>{renderTitle()}</Text>
          <Text style={S.subtitle}>{t("subtitle")}</Text>
        </View>
      </View>
      <Button
        text={t("button")}
        onPress={receiveTicket}
        borderColor={theme.colors.brand.primary[600]}
        backgroundColor={theme.colors.brand.primary[600]}
        textColor={theme.colors.neutral10}
        customStyles={{
          borderRadius: 4,
          maxWidth: 328,
          maxHeight: 48,
        }}
      />
    </View>
  );
}
