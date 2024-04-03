import { View, Text, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "contexts/currentUserContext";
import { useFocusEffect } from "@react-navigation/native";
import CardReport from "components/moleculars/CardReport";
import Report from "@ribon.io/shared/types/entities/Report";
import S from "./styles";

type Props = {
  title: string;
  description: string;
  data: Report[];
  refetch: () => void;
};

export default function ReportsSection({
  title,
  description,
  data,
  refetch,
}: Props): JSX.Element | null {
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

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

  return !isLoading ? (
    <View>
      <View style={S.container}>
        <Text style={S.title}>{title}</Text>
        <Text style={S.description}>{description}</Text>
      </View>
      <View style={S.reportList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          contentContainerStyle={S.flatList}
          renderItem={({ item }) => (
            <View style={S.cardViewItem}>
              <CardReport title={item.name} />
            </View>
          )}
        />
      </View>
    </View>
  ) : null;
}
