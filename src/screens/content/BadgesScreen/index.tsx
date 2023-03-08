import useBadges from "hooks/apiHooks/useBadges";
import { FlatList, Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import FlipCard from "react-native-flip-card";
import { theme } from "@ribon.io/shared/styles";
import Image from "components/atomics/Image";
import usePoints from "hooks/apiHooks/usePoints";
import { useFocusEffect } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import S from "./styles";

function BadgesScreen() {
  const { userBadges, refetch } = useBadges();
  const { userPoints, refetch: refetchPoints } = usePoints();

  useFocusEffect(
    useCallback(() => {
      refetch();
      refetchPoints();
    }, []),
  );

  const renderBadgeItem = ({ item }: any) => (
    <FlipCard style={{ marginBottom: 40 }}>
      {/* Face Side */}
      <View style={{ opacity: item.claimed ? 1.0 : 0.4 }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              S.BadgeCard,
              {
                borderColor: item.claimed
                  ? theme.colors.brand.primary[300]
                  : theme.colors.neutral[300],
                borderStyle: item.claimed ? "solid" : "dashed",
              },
            ]}
          >
              {item.image && <Lottie source={{uri: item.image}} style={S.BadgeImage}/>}
          </View>
          <Text style={S.BadgeText}>{item.name}</Text>
        </View>
      </View>
      {/* Back Side */}
      <View
        style={{
          opacity: item.claimed ? 1.0 : 0.4,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Text style={S.BadgeText}>{item.description}</Text>
      </View>
    </FlipCard>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.brand.primary[300],
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 100,
          marginTop: 50,
        }}
      >
        <View>
          <Text style={S.Title}>{userPoints?.level}</Text>
          <Text style={S.Subtitle}>level</Text>
        </View>
        <View>
          <Text style={S.Title}>{userPoints?.points}</Text>
          <Text style={S.Subtitle}>ripoints</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: theme.colors.neutral10,
          paddingTop: 35,
        }}
      >
        <FlatList
          data={userBadges}
          renderItem={renderBadgeItem}
          numColumns={3}
        />
      </View>
    </View>
  );
}

export default BadgesScreen;
