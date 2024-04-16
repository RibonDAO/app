import { View, Text, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useFocusEffect } from "@react-navigation/native";
import CardReport from "components/moleculars/CardReport";
import Report from "@ribon.io/shared/types/entities/Report";
import { useTranslation } from "react-i18next";
import S from "./styles";

type Props = {
  data: Report[];
  refetch: () => void;
};

export default function ReportsSection({
  data,
  refetch,
}: Props): JSX.Element | null {
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesScreen",
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [currentUser]);

  const getReportClickEventName = (name: string) => {
    if (name.toLowerCase() === t("reports.seeAllCard"))
      return "allReportsCard_click";

    return "reportCard_click";
  };

  return !isLoading ? (
    <View>
      <View style={S.container}>
        <Text style={S.title}>{t("reports.title")}</Text>
        <Text style={S.description}>{t("reports.description")}</Text>
      </View>
      <View style={S.reportList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
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
