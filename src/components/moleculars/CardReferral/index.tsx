import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";
import { Integration } from "@ribon.io/shared/types/entities";
import { useEffect, useState } from "react";
import { View, Share } from "react-native";
import useUserIntegration from "hooks/userHooks/useUserIntegration";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUserProfile } from "@ribon.io/shared";
import { useLanguage } from "contexts/languageContext";
import Star from "./assets/Shape";
import GiftBox from "./assets/GiftBox";
import * as S from "./styles";

interface ReferralIntegration {
  name: string;
  logo: File | undefined;
  ticketAvailabilityInMinutes: null;
  status: string;
  metadata: {
    branch: "referral";
    userId?: number;
    profilePhoto?: string;
  };
}

const APP_LINK = "https://donation.app.link/RibonApp";

function CardReferral(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "cardReferral",
  });

  const { createUserIntegration, getUserIntegration } = useUserIntegration();
  const { currentUser } = useCurrentUser();
  const { userProfile } = useUserProfile();
  const { profile } = userProfile();
  const { currentLang } = useLanguage();

  const [integration, setIntegration] = useState<any>();

  const fetchIntegration = () => {
    getUserIntegration("referral").then((integrationResponse) => {
      if (integrationResponse) setIntegration(integrationResponse);
    });
  };

  const finalLink = (data?: Integration) => {
    const integrationData = data || integration;

    if (!integrationData) return "";

    const params = new URLSearchParams({
      integration_id: integrationData.uniqueAddress,
      utm_source: currentLang === "pt-BR" ? "ribonweb_pt" : "ribonweb_en",
      utm_medium: "referral",
      utm_campaign: "mobile",
    });

    return `${APP_LINK}?${params.toString()}`;
  };

  const copyTextToClipboard = (data?: Integration) => {
    const text = finalLink(data);
    Share.share({
      message: text,
    });
  };

  const handleClick = () => {
    logEvent("referralBtn_click");

    if (!integration) {
      const payload: ReferralIntegration = {
        name: profile?.name || "User",
        logo: undefined,
        ticketAvailabilityInMinutes: null,
        status: "active",
        metadata: {
          branch: "referral",
          userId: currentUser?.id,
          profilePhoto: profile?.photo,
        },
      };

      createUserIntegration(payload).then((response) => {
        setIntegration(response?.data);
        copyTextToClipboard(response?.data);
      });
    } else {
      copyTextToClipboard();
    }
  };

  useEffect(() => {
    logEvent("referralBtn_view");
    fetchIntegration();
  }, []);

  if (!profile) return <View />;

  return (
    <S.Container>
      <S.ShapeContainer>
        <Star />
      </S.ShapeContainer>
      <GiftBox />
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      <S.Button accessibilityRole="button" onPress={handleClick}>
        <S.Cta>{t("cta")}</S.Cta>
      </S.Button>
    </S.Container>
  );
}

export default CardReferral;
