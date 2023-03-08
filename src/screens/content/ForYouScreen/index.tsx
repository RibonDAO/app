import { View } from "react-native";
import { RootStackScreenProps } from "types";
import LockedSection from "./LockedSection";
import { useCanDonate } from "@ribon.io/shared";
import { RIBON_INTEGRATION_ID } from "utils/constants/Application";
import { useCurrentUser } from "contexts/currentUserContext";
import styles from "./styles";
import { useEffect } from "react";
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
    if (canDonate) return <LockedSection />;

    return <NewsSection />;
  };

  return <View style={styles.container}>{renderSection()}</View>;
}
