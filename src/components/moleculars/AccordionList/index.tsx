import { FlatList } from "react-native";
import { View } from "react-native";
import Accordion from "../Accordion";
import * as S from "./styles";

function AccordionList() {
  const listItem = [
    {
      title: "Item 1",
      subtitle: "Subtitle 1",
      iconUrl: "https://picsum.photos/200",
      description: "This is the description for item 1.",
    },
    {
      title: "Item 2",
      subtitle: "Subtitle 2",
      iconUrl: "https://picsum.photos/200",
      description: "This is the description for item 2.",
    },
    {
      title: "Item 3",
      subtitle: "Subtitle 3",
      iconUrl: "https://picsum.photos/200",
      description: "", // No description for this item
    },
    {
      title: "Item 4",
      subtitle: "Subtitle 4",
      iconUrl: "https://picsum.photos/200",
      description: "This is the description for item 4.",
    },
  ];

  return (
    <View>
      <S.Title>Por projeto</S.Title>
      <FlatList
        data={listItem}
        renderItem={({ item }) => (
          <Accordion
            title={item.title}
            subtitle={item.subtitle}
            iconUrl={item.iconUrl}
            description={item.description}
            isExpansible={Boolean(item?.description)}
          />
        )}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={S.Separator}
      />
    </View>
  );
}

export default AccordionList;
