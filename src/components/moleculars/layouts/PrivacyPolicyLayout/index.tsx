import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { openInWebViewer } from "lib/linkOpener";
import S from "./styles";

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
    <View>
      <Text style={S.privacyPolicyText}>
        {t("agreementText")}{" "}
        <Text style={S.privacyPolicyLink} onPress={linkToTerms}>
          {t("termsText")}
        </Text>
        {t("and")}{" "}
        <Text style={S.privacyPolicyLink} onPress={linkToPrivacyPolicy}>
          {t("privacyPolicyText")}
        </Text>
      </Text>
    </View>
  );
}

export default PrivacyPolicyLayout;
