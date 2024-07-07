import { ReactNode } from "react";
import * as S from "./styles";

export type IconType = "TicketIconOutlined" | "RibonFlagIcon";

type Props = {
  value: number;
  description: string;
  icon: ReactNode;
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
