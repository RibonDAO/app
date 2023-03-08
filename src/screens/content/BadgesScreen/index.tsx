import useBadges from "hooks/apiHooks/useBadges";
import { FlatList, Text, View } from "react-native";
import { useEffect } from "react";
import FlipCard from "react-native-flip-card";
import { theme } from "@ribon.io/shared/styles";
import Image from "components/atomics/Image";
import S from "./styles";

function BadgesScreen() {
  const { userBadges } = useBadges();

  useEffect(() => {
    console.log(userBadges);
  }, [userBadges]);

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
            <Image style={S.BadgeImage} source={{ uri: item.image }} />
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
          <Text style={S.Title}>5</Text>
          <Text style={S.Subtitle}>badges</Text>
        </View>
        <View>
          <Text style={S.Title}>800</Text>
          <Text style={S.Subtitle}>ribons</Text>
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
