import { useTranslation } from "react-i18next";
import AccordionList from "components/moleculars/AccordionList";
import { useCurrentUser } from "contexts/currentUserContext";
import { useImpact, useLegacyImpact } from "@ribon.io/shared/hooks";
import { useFormattedImpactText } from "hooks/useFormattedImpactText";
import Button from "components/atomics/buttons/Button";
import { useCallback, useState } from "react";
import { theme } from "@ribon.io/shared/styles";
import { useFocusEffect } from "@react-navigation/native";
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

  const activeProjects = formatImpactData(
    formattedImpactText,
    "active",
    userImpact,
    undefined,
  );
  const inactiveProjects = formatImpactData(
    formattedImpactText,
    "inactive",
    userImpact,
    legacyUserImpact,
  );

  const impactList = [
    {
      title: t("activeProjects"),
      data: activeProjects,
    },
    {
      title: t("inactiveProjects"),
      subtitle: t("inactiveProjectsDescription"),
      data: inactiveProjects,
    },
  ];

  const filteredImpactList = showInactive
    ? impactList
    : impactList.filter((item) => item.title !== t("inactiveProjects"));

  const isImpactListEmpty = !(activeProjects.length || inactiveProjects.length);
  const hasInactiveProjects = inactiveProjects.length > 0;

  const renderInactiveButton = () => {
    if (hasInactiveProjects && !showInactive) {
      return (
        <S.InactiveButtonContainer displayButton={showInactive}>
          <Button
            onPress={() => {
              setShowInactive(true);
            }}
            text={t("inactiveProjectsButton")}
            outline
            customStyles={{
              borderRadius: 12,
            }}
            textColorOutline={theme.colors.brand.primary[600]}
            borderColorOutline={theme.colors.brand.primary[600]}
          />
        </S.InactiveButtonContainer>
      );
    }
    return null;
  };

  useFocusEffect(
    useCallback(() => {
      setShowInactive(false);
    }, []),
  );

  return (
    <S.TabViewSection>
      <AccordionList
        header={<ProfileSection />}
        impactList={isImpactListEmpty ? [] : filteredImpactList}
        footer={renderInactiveButton()}
      />
    </S.TabViewSection>
  );
}

export default AccordionSection;
