import { useTranslation } from "react-i18next";
import { openInWebViewer } from "lib/linkOpener";
import * as S from "./styles";

function PrivacyPolicyLayout() {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.donateScreen",
  });

  const linkToPrivacyPolicy = () => {
    openInWebViewer(t("privacyPolicyLink"));
  };

  const linkToTerms = () => {
    openInWebViewer(t("termsLink"));
  };

  return (
    <S.container>
      <S.privacyPolicyText>{t("agreementText")}</S.privacyPolicyText>
      <S.privacyPolicyLink onPress={linkToTerms}>
        <S.privacyPolicyLinkText>{t("termsText")}</S.privacyPolicyLinkText>
      </S.privacyPolicyLink>
      <S.privacyPolicyText>{t("and")}</S.privacyPolicyText>
      <S.privacyPolicyLink onPress={linkToPrivacyPolicy}>
        <S.privacyPolicyLinkText>
          {t("privacyPolicyText")}
        </S.privacyPolicyLinkText>
      </S.privacyPolicyLink>
      <S.privacyPolicyText>{t("ribon")}</S.privacyPolicyText>
    </S.container>
  );
}

export default PrivacyPolicyLayout;
