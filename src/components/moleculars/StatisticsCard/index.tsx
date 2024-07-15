import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import * as S from "./styles";
import StatisticsModal from "./StatisticsModal";
import { Icon } from "./Icon";

export type IconType = "TicketColorsIcon" | "CalendarIcon";

type Props = {
  value?: number;
  description: string;
  icon: IconType;
  backgroundColor: string;
};

function StatisticsCard({ value, description, icon, backgroundColor }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.profileSection",
  });
  const [modalVisible, setModalVisible] = useState(false);

  if (value === undefined)
    return (
      <S.Container color={backgroundColor}>
        <Placeholder Right={PlaceholderMedia} Animation={Fade} >
          <PlaceholderLine width={30} />
          <PlaceholderLine width={30} />
          <PlaceholderLine width={80} />
        </Placeholder>
      </S.Container>
    );

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
