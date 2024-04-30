import CardReport from "components/moleculars/CardReport";
import { useTranslation } from "react-i18next";
import { useReports } from "@ribon.io/shared/hooks";
import * as S from "./styles";

export default function ReportsSection(): JSX.Element | null {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  const { reports } = useReports();

  const getReportClickEventName = (name: string) => {
    if (name.toLowerCase() === t("reports.seeAllCard"))
      return "allReportsCard_click";

    return "reportCard_click";
  };

  return reports.length ? (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{t("reports.title")}</S.Title>
        <S.Description>{t("reports.description")}</S.Description>
      </S.TitleContainer>
      <S.ReportListContainer>
        <S.ReportList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={reports}
          renderItem={({ item }: any) => (
            <S.CardViewItem
              isLastChild={item.name.toLowerCase() === t("reports.seeAllCard")}
            >
              <CardReport
                title={`${item.name} →`}
                link={item.link}
                showIcon={item.name.toLowerCase() !== t("reports.seeAllCard")}
                clickEventName={getReportClickEventName(item.name)}
              />
            </S.CardViewItem>
          )}
        />
      </S.ReportListContainer>
    </S.Container>
  ) : null;
}
