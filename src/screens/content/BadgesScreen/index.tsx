import useBadges from "hooks/apiHooks/useBadges";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useEffect } from "react";

function BadgesScreen() {
  const { userBadges, isLoading } = useBadges();

  useEffect(() => {
    console.log(userBadges);
  }, [userBadges]);

  return (
    <View>
      <Text>Badges</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={userBadges}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

export default BadgesScreen;
