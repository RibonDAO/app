import { useNavigation } from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { logEvent } from "services/analytics";
import { theme } from "@ribon.io/shared";
import AddIcon from "assets/icons/AddIcon";
import { useIntegrationContext } from "contexts/integrationContext";
import usePageView from "hooks/usePageView";
import { Image } from "react-native";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_FROM_INTEGRATION,
  RECEIVED_TICKET_AT_KEY,
} from "lib/localStorage/constants";
import { useTickets } from "hooks/useTickets";
import { useTicketsContext } from "contexts/ticketsContext";
import { Logo } from "./assets/Logo";
import Ticket from "./assets/Ticket";
import S from "./styles";

export default function GiveTicketV2Screen() {
  const { t } = useTranslation("translation", {
    keyPrefix: "content.giveTicketV2Screen",
  });
  const { handleCollect } = useTickets();
  const { navigateTo } = useNavigation();
  const { refetchTickets } = useTicketsContext();
  const { currentIntegrationId, integration, externalId } =
    useIntegrationContext();

  usePageView("P35_view", { from: currentIntegrationId });

  const receiveTicket = async () => {
    await handleCollect({
      onSuccess: () => {
        setLocalStorageItem(RECEIVED_TICKET_AT_KEY, Date.now().toString());
        setLocalStorageItem(
          RECEIVED_TICKET_FROM_INTEGRATION,
          currentIntegrationId.toString(),
        );
      },
    });
    refetchTickets();
    logEvent("P35_getTicketBtn_click");
    navigateTo("CausesScreen");
  };

  const renderTitle = () => {
    if (!integration) return t("title");

    const integrationName = integration.name;

    if (externalId) return t("integrationTitlePlural", { integrationName });

    const isRibonIntegration = currentIntegrationId === RIBON_INTEGRATION_ID;

    if (isRibonIntegration) return t("title");

    return t("integrationTitle", { integrationName });
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
            <Image
              source={{ uri: integration.logo }}
              style={S.logoIntegration}
              accessibilityIgnoresInvertColors
            />
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
          maxHeight: 48,
        }}
      />
    </View>
  );
}
