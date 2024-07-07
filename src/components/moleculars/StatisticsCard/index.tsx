import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import StatisticsModal from "./StatisticsModal";

export type IconType = "TicketIconOutlined" | "RibonFlagIcon";

type Props = {
  value: number;
  description: string;
  icon: ReactNode;
  backgroundColor: string;
};

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
      <S.Right>{icon}</S.Right>
      <StatisticsModal
        type={description === t("donatedTickets") ? "tickets" : "daysDonating"}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </S.Container>
  );
}

export default StatisticsCard;
