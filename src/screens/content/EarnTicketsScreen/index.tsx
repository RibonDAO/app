import { View } from "react-native";
import { useRouteParams } from "hooks/useRouteParams";

import TabViewSection from "./TabViewSection";
import * as S from "./styles";

export default function EarnTicketsScreen(): JSX.Element {
  const { params } = useRouteParams<"EarnTicketsScreen">();

  return (
    <View style={S.Container}>
      <TabViewSection initialTabIndex={params?.currentTab || 0} />
    </View>
  );
}
