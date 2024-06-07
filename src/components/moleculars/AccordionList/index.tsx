import { FlatList, SectionList, Text } from "react-native";
import { View } from "react-native";
import Accordion, { Props as AccordionProps } from "../Accordion";
import * as S from "./styles";
import { ReactElement, ReactNode } from "react";

type Props = {
  title: string;
  impactList: Pick<
    AccordionProps,
    "title" | "subtitle" | "iconUrl" | "description" | "quantity"
  >[];
  header?: ReactElement;
};

function AccordionList({ title, impactList, header }: Props) {
  const data = [
    {
      title: "Por projeto",
      data: [
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
          quantity: 3,
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
      ],
    },
    {
      title: "Projetos inativos",
      subtitle: "Projetos de ONGs que já não estão mais no app",
      data: [
        {
          title: "Item 1",
          subtitle: "Subtitle 1",
          iconUrl: "https://picsum.photos/200",
          description: "This is the description for item 1.",
          quantity: 3,
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
      ],
    },
  ];

  return (
    <SectionList
      ListHeaderComponent={header}
      ItemSeparatorComponent={S.ItemSeparator}
      sections={data}
      keyExtractor={({ title }) => title}
      renderItem={({ item }) => (
        <Accordion
          title={item.title}
          subtitle={item.subtitle}
          iconUrl={item.iconUrl}
          description={item.description}
          isExpansible={Boolean(item?.description)}
          quantity={item?.quantity}
        />
      )}
      renderSectionHeader={({ section: { title, subtitle } }) => {
        return (
          <>
            {title === "Projetos inativos" && <S.SectionSeparator />}
            <S.Title>{title}</S.Title>
            <S.SubTitle>{subtitle}</S.SubTitle>
          </>
        );
      }}
    />
  );
}

export default AccordionList;
