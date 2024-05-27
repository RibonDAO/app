import * as React from "react";
import { theme } from "@ribon.io/shared";
import GenericIcon from "./assets/Generic";
import SingleTicketIcon from "./assets/SingleTicket";
import MultipleTicketsIcon from "./assets/MultipleTickets";
import TicketBoxIcon from "./assets/TicketBox";
import * as S from "./styles";

export type Props = {
  title: string;
  subtitle: {
    icon?: JSX.Element;
    text: string;
    color: string;
  };
  background?: "singleTicket" | "multipleTickets" | "ticketBox" | "generic";
  children?: JSX.Element | JSX.Element[];
};

type Background = {
  color: string;
  vector: JSX.Element;
};

const backgrounds: Record<string, Background> = {
  singleTicket: {
    color: "#FEFBEA",
    vector: <SingleTicketIcon />,
  },
  multipleTickets: {
    color: theme.colors.brand.tertiary[50],
    vector: <MultipleTicketsIcon />,
  },
  ticketBox: {
    color: theme.colors.brand.tertiary[50],
    vector: <TicketBoxIcon />,
  },
  generic: {
    color: theme.colors.brand.secondary[50],
    vector: <GenericIcon />,
  },
};

function CardTicket({
  title,
  subtitle,
  background = "generic",
  children,
}: Props): JSX.Element {
  return (
    <S.Container background={backgrounds[background].color}>
      <S.VectorContainer>{backgrounds[background].vector}</S.VectorContainer>
      <S.InnerContainer>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.SubtitleContainer>
            {subtitle.icon && <S.SubtitleIcon>{subtitle.icon}</S.SubtitleIcon>}
            <S.Subtitle color={subtitle.color}>{subtitle.text}</S.Subtitle>
          </S.SubtitleContainer>
        </S.Header>
        <S.Content>{children}</S.Content>
      </S.InnerContainer>
    </S.Container>
  );
}

export default CardTicket;
