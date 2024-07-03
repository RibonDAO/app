import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AccordionList from "components/moleculars/AccordionList";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useLegacyImpact } from "@ribon.io/shared";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import S from "./styles";
import ProfileSection from "../ProfileSection";
import { formatImpactData } from "./formatImpactData";

function AccordionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.impactList",
  });

  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);
  const { legacyUserImpact } = useLegacyImpact(currentUser?.id);
  const { formattedImpactText } = useFormattedImpactText();

  const impactList = [
    {
      title: t("activeProjects"),
      data: formatImpactData(
        formattedImpactText,
        "active",
        userImpact,
        undefined,
      ),
    },
    {
      title: t("inactiveProjects"),
      subtitle: t("inactiveProjectsDescription"),
      data: formatImpactData(
        formattedImpactText,
        "inactive",
        userImpact,
        legacyUserImpact,
      ),
    },
  ];

  const filterImpactList = () => {
    if (impactList[1].data.length === 0) return [impactList[0]];
    return impactList;
  };

  const isImpactListEmpty = !(
    impactList[0].data.length || impactList[1].data.length
  );

  return (
    <View style={S.tabViewSection}>
      <AccordionList
        header={<ProfileSection />}
        impactList={isImpactListEmpty ? [] : filterImpactList()}
      />
    </View>
  );
}

export default AccordionSection;
