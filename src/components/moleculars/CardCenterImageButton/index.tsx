import { Text, View, SafeAreaView, FlatList } from "react-native";
import Image from "components/atomics/Image";

import { Story } from "@ribon.io/shared";
import S from "./styles";


type Props = {
  stories?: Story[];
};

type ItemProps = { image: string; title: string };

function ListItem({ item }: { item: ItemProps }) {
  return (
    <View style={S.item}>
      <Image
        source={{
          uri: item.image,
        }}
        style={S.itemPhoto}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <Text style={S.itemText}>{item.title}</Text>
    </View>
  );
}

function CardCenterImageButton({ stories }: Props): JSX.Element {
  return (
    <View style={S.container}>
      <View style={S.cardWrapper}>
        <SafeAreaView>
          <FlatList
            horizontal
            data={stories}
            renderItem={({ item }) => <ListItem item={item} />}
            showsHorizontalScrollIndicator
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

export default CardCenterImageButton;
