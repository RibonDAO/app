import { SectionList } from "react-native";
import { useTranslation } from "react-i18next";
import Accordion, { Props as AccordionProps } from "../Accordion";
import * as S from "./styles";
import { EmptyComponent } from "./EmptyComponent";

type AccordionData = Pick<
  AccordionProps,
  "title" | "subtitle" | "iconUrl" | "description" | "quantity"
> & { id: number };

type ImpactListItem = {
  title: string;
  subtitle?: string;
  data: AccordionData[];
};

type ImpactList = ImpactListItem[];

type Props = {
  impactList: ImpactList;
  header?: JSX.Element;
  footer?: JSX.Element | null;
};

function AccordionList({ impactList, header, footer }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "users.impactScreen.impactList",
  });

  return (
    <SectionList
      ListHeaderComponent={header}
      ListFooterComponent={footer}
      ItemSeparatorComponent={S.ItemSeparator}
      sections={impactList}
      keyExtractor={({ id }) => id.toString()}
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
      ListEmptyComponent={EmptyComponent}
    />
  );
}

export default AccordionList;
