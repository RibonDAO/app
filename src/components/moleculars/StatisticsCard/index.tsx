import TicketOutlinedIcon from "components/vectors/TicketOutlinedIcon";
import RibonFlagIcon from "components/vectors/RibonFlagIcon";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import StatisticsModal from "./StatisticsModal";

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

function StatisticsCard({ value, description, icon, backgroundColor }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection",
  });
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <S.Container color={backgroundColor} onPress={() => setModalVisible(true)}>
      <S.Left>
        <S.Number>{value}</S.Number>
        <S.Text>{description}</S.Text>
      </S.Left>
      <S.Right>
        <Icon icon={icon} />
      </S.Right>
      <StatisticsModal
        type={description === t("donatedTickets") ? "tickets" : "daysDonating"}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </S.Container>
  );
}

export default StatisticsCard;
