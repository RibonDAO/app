import { View } from "react-native";
import { RootStackScreenProps } from "types";
import ForYouScreenPlaceholder from "./placeholder";
import LockedSection from "./LockedSection";
import { useCanDonate } from "@ribon.io/shared";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import styles from "./styles";
import { useEffect } from "react";
import BadgesScreen from "screens/content/BadgesScreen";

export default function ForYouScreen({
  navigation,
}: RootStackScreenProps<"ForYouScreen">) {
  const { currentUser } = useCurrentUser();

  const { canDonate, refetch: refetchCanDonate } =
    useCanDonate(RIBON_INTEGRATION_ID);

  useEffect(() => {
    setTimeout(() => {
      refetchCanDonate();
    }, 500);
  }, [JSON.stringify(currentUser)]);

  const renderSection = () => {
    return <BadgesScreen />

    if (canDonate) {
      return <LockedSection />;
    }

    return <ForYouScreenPlaceholder />;
  };

  return <View style={styles.container}>{renderSection()}</View>;
}
