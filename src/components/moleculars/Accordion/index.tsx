import { ReactNode, useState } from "react";
import ArrowDown from "components/vectors/ArrowDown";
import { theme } from "@ribon.io/shared";
import { View } from "react-native";
import * as S from "./styles";

type Props = {
  title: string;
  subtitle: string;
  iconUrl: string;
  ticketsComponent?: ReactNode;
  description?: string;
  isExpansible?: boolean;
};

function Accordion({
  title,
  subtitle,
  iconUrl,
  isExpansible,
  description,
  ticketsComponent,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.Container
      onPressIn={() => {
        setIsExpanded(!isExpanded);
      }}
    >
      <View>
        <S.ArrowContainer isExpanded={isExpanded} isExpansible={isExpansible}>
          <ArrowDown
            color={theme.colors.brand.primary[600]}
            width={32}
            height={32}
          />
        </S.ArrowContainer>
      </View>

      <View>
        <S.MainArea>
          <View>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
            {ticketsComponent}
          </View>
          <S.Image resizeMode="cover" source={{ uri: iconUrl }} />
        </S.MainArea>

        {isExpanded && isExpansible && (
          <View>
            <S.DescriptionTitle>Equivalente a</S.DescriptionTitle>
            <S.Description>{description}</S.Description>
          </View>
        )}
      </View>
    </S.Container>
  );
}

export default Accordion;
