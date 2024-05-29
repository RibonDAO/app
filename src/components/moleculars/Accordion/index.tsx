import { useState } from "react";
import ArrowDown from "components/vectors/ArrowDown";
import { theme } from "@ribon.io/shared";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import TicketIconText from "../TicketIconText";

export type Props = {
  title: string;
  subtitle: string;
  iconUrl: string;
  quantity?: number;
  description?: string;
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

  return (
    <S.Container
      onPressIn={() => {
        setIsExpanded(!isExpanded);
      }}
    >
      <S.ArrowContainer>
        <S.ArrowController isExpanded={isExpanded} isExpansible={isExpansible}>
          <ArrowDown color={theme.colors.brand.primary[600]} />
        </S.ArrowController>
      </S.ArrowContainer>

      <S.Content>
        <S.MainArea>
          <S.TextArea>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
            {quantity && <TicketIconText quantity={quantity} />}
          </S.TextArea>
          <S.Image resizeMode="cover" source={{ uri: iconUrl }} />
        </S.MainArea>

        {isExpanded && isExpansible && (
          <View>
            <S.DescriptionTitle>{t("equivalent")}</S.DescriptionTitle>
            <S.Description>{description}</S.Description>
          </View>
        )}
      </S.Content>
    </S.Container>
  );
}

export default Accordion;
