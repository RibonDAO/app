import { useCallback, useState } from "react";
import { theme } from "@ribon.io/shared";
import { useTranslation } from "react-i18next";
import Icon from "components/atomics/Icon";
import { useFocusEffect } from "@react-navigation/native";
import * as S from "./styles";
import TicketIconText from "../TicketIconText";
import AccordionPlaceholder from "./AccordionPlaceholder";

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
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection.accordion",
  });

  useFocusEffect(
    useCallback(() => {
      setIsExpanded(false);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, []),
  );

  const handlePress = () => {
    setIsExpanded((prev) => !prev);
  };

  return isLoading ? (
    <AccordionPlaceholder />
  ) : (
    <S.Container onPress={handlePress} testID="accordion">
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
          <S.ExpandedContent>
            <S.DescriptionTitle>{t("equivalent")}</S.DescriptionTitle>
            <S.Description>{description}</S.Description>
          </S.ExpandedContent>
        )}
      </S.Content>
    </S.Container>
  );
}

export default Accordion;
