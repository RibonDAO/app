import React, { useState } from "react";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { Text } from "components/Themed";
import UserSection from "./UserSection";
import styles from "./styles";

type Props = {
  image: string;
  onPress: () => void;
  active?: boolean;
  name: string;
};
function Badge({ image, name, active = false, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.badgeContainer}>
      <View style={styles.badgeRoundContainer}>
        <Image
          source={{ uri: image }}
          style={[styles.badgeImage, { opacity: active ? 1 : 0.4 }]}
        />
      </View>
      <Text style={styles.badgeText}>{name}</Text>
    </TouchableOpacity>
  );
}

function BadgesProfilePage() {
  const image = "https://cdn-icons-png.flaticon.com/512/4387/4387887.png";
  const [badges] = useState([
    { image, name: "Badge 1", active: true },
    { image, name: "Badge 1", active: true },
    { image, name: "Badge 1", active: false },
    { image, name: "Badge 1", active: true },
    { image, name: "Badge 1", active: false },
    { image, name: "Badge 1", active: true },
    { image, name: "Badge 1", active: false },
    { image, name: "Badge 1", active: false },
    { image, name: "Badge 1", active: false },
  ]);
  const handleBadgePress = (badge: { image: string }) => {
    console.log(`Pressed badge ${badge.image}`);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Badge
        image={item.image}
        onPress={() => handleBadgePress(item)}
        active={item.active}
        name={item.name}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <UserSection />
      <FlatList
        data={badges}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.badgesContainer}
        columnWrapperStyle={{
          justifyContent: "space-between",
          padding: 8,
        }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

export default BadgesProfilePage;
