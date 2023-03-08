import useBadges from "hooks/apiHooks/useBadges";
import { FlatList, Text, View, ImageBackground } from "react-native";
import { useCallback } from "react";
import FlipCard from "react-native-flip-card";
import { theme } from "@ribon.io/shared/styles";
import Image from "components/atomics/Image";
import usePoints from "hooks/apiHooks/usePoints";
import { useFocusEffect } from "@react-navigation/native";
import Lottie from "lottie-react-native";
import S from "./styles";
import { useCurrentUser } from "contexts/currentUserContext";

function BadgesScreen() {
  const { userBadges, refetch } = useBadges();
  const { userPoints, refetch: refetchPoints } = usePoints();
  const { currentUser } = useCurrentUser();

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
                  ? theme.colors.brand.primary[800]
                  : theme.colors.neutral[300],
                borderStyle: item.claimed ? "solid" : "dashed",
              },
            ]}
          >
            {item.image && (
              <Lottie source={{ uri: item.image }} style={S.BadgeImage} />
            )}
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
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: theme.colors.brand.primary[800],
        width: "100%",
      }}
      source={{uri: "https://media.gettyimages.com/id/1204136077/vector/blood-donation-concept-seamless-pattern-and-background-with-line-icons-editable-stroke.jpg?s=612x612&w=gi&k=20&c=wuIEXJunRahPmwSASSWUKpxqv3TTaYtBGCdR7_vBNSI="}}
      imageStyle={{opacity: 0.12, height: 350}}
    >
      <View
        style={{
          shadowColor: theme.colors.brand.secondary[300],
          shadowOffset: { width: 10, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 50,
          elevation: 50,
          borderRadius: 60,
          padding: 5,
        }}
      >
        <View
          style={{
            height: 80,
            marginTop: 50,
            marginBottom: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
            <View style={{borderWidth: 4, borderColor: theme.colors.brand.primary[300], padding: 4, borderRadius: 80}}>
                <Image
                    source={{
                        uri: "https://conteudo.imguol.com.br/c/entretenimento/80/2017/04/25/a-atriz-zoe-saldana-como-neytiri-em-avatar-1493136439818_v2_4x3.jpg",
                    }}
                    style={{ width: 90, height: 90, borderRadius: 80 }}
                />
            </View>
          <Text style={S.userText}>{currentUser?.email}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 90,
          marginTop: 15,
        }}
      >
        <View style={{marginTop: 20}}>
          <Text style={S.Title}>{userPoints?.streak}</Text>
          <Text style={S.Subtitle}>streak</Text>
        </View>
        <View>
          <Text style={S.Title}>{userPoints?.points}</Text>
          <Text style={S.Subtitle}>points</Text>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={S.Title}>{userPoints?.level}</Text>
          <Text style={S.Subtitle}>level</Text>
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
    </ImageBackground>
  );
}

export default BadgesScreen;
