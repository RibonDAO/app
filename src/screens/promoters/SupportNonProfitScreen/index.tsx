import { withPlaceholder } from "config/navigation/withPlaceholder";
import CardScreen from "./CardScreen";
import Placeholder from "./placeholder";

function SupportNonProfitScreen(): JSX.Element {
  return <CardScreen />;
}

export default withPlaceholder(SupportNonProfitScreen, Placeholder);
