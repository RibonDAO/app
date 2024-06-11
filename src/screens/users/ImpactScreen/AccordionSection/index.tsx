import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AccordionList from "components/moleculars/AccordionList";
import { useCurrentUser } from "contexts/currentUserContext";
import { Impact, useImpact } from "@ribon.io/shared";
import S from "./styles";
import ProfileSection from "../ProfileSection";

const getData = (status: "active" | "inactive", userImpact?: Impact[]) =>
  userImpact
    ?.filter((item) => item.nonProfit.status === status)
    .map((item) => ({
      title: item.nonProfit.impactTitle,
      subtitle: item.nonProfit.name,
      description: item.nonProfit.impactDescription,
      iconUrl: item.nonProfit.icon || item.nonProfit.coverImage,
      quantity: item.nonProfit.impactByTicket,
    })) || [];

function AccordionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.impactList",
  });

  const { currentUser } = useCurrentUser();
  const { userImpact } = useImpact(currentUser?.id);

  const impactList = [
    {
      title: t("activeProjects"),
      data: getData("active", userImpact),
    },
    {
      title: t("inactiveProjects"),
      subtitle: t("inactiveProjectsDescription"),
      data: getData("inactive", userImpact),
    },
  ];

  return (
    <View style={S.tabViewSection}>
      <AccordionList header={<ProfileSection />} impactList={impactList} />
    </View>
  );
}

export default AccordionSection;
