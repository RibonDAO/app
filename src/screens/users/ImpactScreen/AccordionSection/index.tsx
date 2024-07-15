import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AccordionList from "components/moleculars/AccordionList";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useLegacyImpact } from "@ribon.io/shared";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import Button from "components/atomics/buttons/Button";
import { useState } from "react";
import * as S from "./styles";
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
  const [showInactive, setShowInactive] = useState(false);

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

  const filteredImpactList = showInactive
    ? impactList
    : impactList.filter((item) => item.title !== t("inactiveProjects"));

  const isImpactListEmpty = !(
    impactList[0].data.length || impactList[1].data.length
  );

  return (
    <View style={S.styles.tabViewSection}>
      <AccordionList
        header={<ProfileSection />}
        impactList={isImpactListEmpty ? [] : filteredImpactList}
        footer={
          <S.InactiveButtonContainer displayButton={showInactive}>
            <Button
              onPress={() => {
                setShowInactive(true);
              }}
              text="Mostrar projetos inativos"
              outline
              customStyles={{}}
            />
          </S.InactiveButtonContainer>
        }
      />
    </View>
  );
}

export default AccordionSection;