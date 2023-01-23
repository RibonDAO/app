import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "components/Themed";
import { useCallback, useEffect, useState } from "react";
import CauseImage from "./CauseImage";
import S from "./styles";
import { useCausesContext } from "contexts/causesContext";
import { useTranslation } from "react-i18next";
import AnimationModal from "../ReceiveTicketScreen/AnimationModal";

function ChooseCauseScreen(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.chooseCauseScreen",
  });
  const { activeCauses } = useCausesContext();
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    setModalVisible(true);
  }, [modalVisible])

  const causesList = useCallback(
    () =>
      activeCauses?.map((cause: Cause) => (
        <CauseImage
          key={cause.id}
          id={cause.id}
          name={cause.name}
          coverImage={cause.coverImage}
        />
      )),
    [activeCauses],
  );

  function renderAnimationModal() {
    return <AnimationModal visible={modalVisible} setVisible={setModalVisible} />
  }

  return (
    <View style={S.container}>
      <Text style={S.text}>{t("title")}</Text>

      {causesList()}

      {renderAnimationModal()}
    </View>
  );
}

export default ChooseCauseScreen;
