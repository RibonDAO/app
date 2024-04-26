import { View, Text, FlatList } from "react-native";
import CardReport from "components/moleculars/CardReport";
import { useTranslation } from "react-i18next";
import { useReports } from "@ribon.io/shared/hooks";
import S from "./styles";

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
    <View>
      <View style={S.container}>
        <Text style={S.title}>{t("reports.title")}</Text>
        <Text style={S.description}>{t("reports.description")}</Text>
      </View>
      <View style={S.reportList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={reports}
          contentContainerStyle={S.flatList}
          renderItem={({ item }) => (
            <View style={S.cardViewItem}>
              <CardReport
                title={`${item.name} →`}
                link={item.link}
                showIcon={item.name.toLowerCase() !== t("reports.seeAllCard")}
                clickEventName={getReportClickEventName(item.name)}
              />
            </View>
          )}
        />
      </View>
    </View>
  ) : null;
}
