import TicketOutlinedIcon from "components/vectors/TicketOutlinedIcon";
import RibonFlagIcon from "components/vectors/RibonFlagIcon";
import * as S from "./styles";

type IconType = "TicketIconOutlined" | "RibonFlagIcon";

type Props = {
  value: number;
  description: string;
  icon: IconType;
  backgroundColor: string;
};

type IconProps = { icon: IconType };

function Icon({ icon }: IconProps) {
  switch (icon) {
    case "TicketIconOutlined":
      return <TicketOutlinedIcon />;
    case "RibonFlagIcon":
      return <RibonFlagIcon />;
    default:
      return null;
  }
}

function StatisticsCard({
  value,
  description,
  icon,
  backgroundColor,
}: Props) {
  return (
    <S.Container color={backgroundColor}>
      <S.Left>
        <S.Number>{value}</S.Number>
        <S.Text>{description}</S.Text>
      </S.Left>
      <S.Right>
        <Icon icon={icon} />
      </S.Right>
    </S.Container>
  );
}

export default StatisticsCard;
