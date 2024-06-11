import { SectionList } from "react-native";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Accordion, { Props as AccordionProps } from "../Accordion";
import * as S from "./styles";

type ImpactList = (
  | {
      title: string;
      subtitle?: undefined;
      data: Pick<
        AccordionProps,
        "title" | "subtitle" | "iconUrl" | "description" | "quantity"
      >[];
    }
  | {
      title: string;
      subtitle: string;
      data: Pick<
        AccordionProps,
        "title" | "subtitle" | "iconUrl" | "description" | "quantity"
      >[];
    }
)[];

type Props = {
  impactList: ImpactList;
  header?: ReactElement;
};

function AccordionList({ impactList, header }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.impactList",
  });

  return (
    <SectionList
      ListHeaderComponent={header}
      ItemSeparatorComponent={S.ItemSeparator}
      sections={impactList}
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
      renderSectionHeader={({ section: { title, subtitle } }) => (
        <>
          {title === t("inactiveProjects") && <S.SectionSeparator />}
          <S.Title>{title}</S.Title>
          <S.SubTitle>{subtitle}</S.SubTitle>
        </>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
}

export default AccordionList;
