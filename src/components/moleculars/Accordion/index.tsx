import { ReactNode, useState } from "react";
import ArrowDown from "components/vectors/ArrowDown";
import { theme } from "@ribon.io/shared";
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
      <S.LeftArea>
        <S.ArrowContainer>
          <ArrowDown
            color={theme.colors.brand.primary[600]}
            width={32}
            height={32}
          />
        </S.ArrowContainer>
      </S.LeftArea>

      <S.RightArea>
        <S.MainArea>
          <S.MiddleContainer>
            <S.Title>{title}</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
            {ticketsComponent}
          </S.MiddleContainer>
          <S.Image resizeMode="cover" source={{ uri: iconUrl }} />
        </S.MainArea>

        {isExpanded && isExpansible && (
          <S.DescriptionArea>
            <S.DescriptionTitle>Equivalente a</S.DescriptionTitle>
            <S.Description>{description}</S.Description>
          </S.DescriptionArea>
        )}
      </S.RightArea>
    </S.Container>
  );
}

export default Accordion;
