import { View } from "react-native";
import { RootStackScreenProps } from "types";
import { useCanDonate } from "@ribon.io/shared";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import styles from "./styles";
import TabViewSection from "./TabViewSection";

export default function ForYouScreen({
  navigation,
}: RootStackScreenProps<"ForYouScreen">) {
  const { currentUser } = useCurrentUser();

  const { refetch: refetchCanDonate } = useCanDonate(RIBON_INTEGRATION_ID);

  useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  const renderSection = () => <TabViewSection />;

  return <View style={styles.container}>{renderSection()}</View>;
}
