import { useCallback, useState } from "react";
import { theme } from "@ribon.io/shared";
import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import { useFocusEffect } from "@react-navigation/native";
import * as S from "./styles";
import TicketIconText from "../TicketIconText";

export type Props = {
  title: string;
  subtitle: string;
  iconUrl: string;
  quantity?: number;
  description?: string | JSX.Element;
  isExpansible?: boolean;
};

function Accordion({
  title,
  subtitle,
  iconUrl,
  isExpansible,
  description,
  quantity,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection.accordion",
  });

  useFocusEffect(
    useCallback(() => {
      setIsExpanded(false);
    }, []),
  );

  return (
    <S.Container
      onPressIn={() => {
        setIsExpanded(!isExpanded);
      }}
      testID="accordion"
    >
      <S.ArrowContainer>
        <S.ArrowController isExpansible={isExpansible}>
          <Icon
            type="rounded"
            name={isExpanded ? "expand_less" : "expand_more"}
            size={24}
            color={theme.colors.brand.primary[600]}
          />
        </S.ArrowController>
      </S.ArrowContainer>

      <S.Content>
        <S.MainArea>
          <S.TextArea>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>

            {quantity ? (
              <TicketIconText quantity={quantity} buttonDisabled />
            ) : null}
          </S.TextArea>
          <S.Image resizeMode="cover" source={{ uri: iconUrl }} />
        </S.MainArea>

        {isExpanded && isExpansible && (
          <S.expandedContent>
            <S.DescriptionTitle>{t("equivalent")}</S.DescriptionTitle>
            <S.Description>{description}</S.Description>
          </S.expandedContent>
        )}
      </S.Content>
    </S.Container>
  );
}

export default Accordion;
