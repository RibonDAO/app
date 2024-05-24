import { FlatList } from "react-native";
import { View } from "react-native";
import Accordion, { Props as AccordionProps } from "../Accordion";
import * as S from "./styles";

type Props = {
  title: string;
  impactList: Pick<
    AccordionProps,
    "title" | "subtitle" | "iconUrl" | "description" | "quantity"
  >[];
};

function AccordionList({ title, impactList }: Props) {
  return (
    <View>
      <S.Title>{title}</S.Title>
      <FlatList
        data={impactList}
        renderItem={({ item }) => (
          <Accordion
            title={item.title}
            subtitle={item.subtitle}
            iconUrl={item.iconUrl}
            description={item.description}
            isExpansible={Boolean(item?.description)}
            quantity={item.quantity}
          />
        )}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={S.Separator}
      />
    </View>
  );
}

export default AccordionList;
