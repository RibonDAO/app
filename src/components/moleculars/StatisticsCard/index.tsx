import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import * as S from "./styles";

export type IconType = "TicketColorsIcon" | "CalendarIcon";

type Props = {
  value?: number;
  description: string;
  icon: JSX.Element | null;
  backgroundColor: string;
  handlePress: () => void;
};

function StatisticsCard({
  value,
  description,
  icon,
  backgroundColor,
  handlePress,
}: Props) {
  if (value === undefined)
    return (
      <S.Container color={backgroundColor}>
        <Placeholder Right={PlaceholderMedia} Animation={Fade}>
          <PlaceholderLine width={30} />
          <PlaceholderLine width={30} />
          <PlaceholderLine width={80} />
        </Placeholder>
      </S.Container>
    );

  return (
    <S.Container color={backgroundColor} onPress={handlePress}>
      <S.Left>
        <S.Number>{value}</S.Number>
        <S.Text>{description}</S.Text>
      </S.Left>
      <S.Right>{icon}</S.Right>
    </S.Container>
  );
}

export default StatisticsCard;
