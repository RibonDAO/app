import React from "react";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import usePageView from "hooks/usePageView";
import Placeholder from "./placeholder";

function SupportCauseScreen() {
  usePageView("P2_view");

  return <CardScreen />;
}
export default withPlaceholder(SupportCauseScreen, Placeholder);
