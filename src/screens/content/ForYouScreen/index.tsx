import { View } from "react-native";
import { RootStackScreenProps } from "types";
import { useCanDonate } from "@ribon.io/shared/hooks";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import BadgesScreen from "screens/content/BadgesScreen";
import styles from "./styles";
import LockedSection from "./LockedSection";
import NewsSection from "./NewsSection";

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
    if (canDonate) return <LockedSection />;

    return <NewsSection />;
  };

  return <View style={styles.container}>{renderSection()}</View>;
}
