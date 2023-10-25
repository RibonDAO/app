import { GrowthBook } from "@growthbook/growthbook-react";
import { logError } from "services/crashReport";
import { logEvent } from "services/analytics";
import { RIBON_GROWTHBOOK_URL } from "utils/constants/Application";
import analytics from "@react-native-firebase/analytics";

// Create a GrowthBook instance
export const growthbook = new GrowthBook({
  apiHost: "https://growthbook.ribon.io:444",
  clientKey: process.env.REACT_APP_GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.REACT_APP_GROWTHBOOK_DEV_MODE === "true",
  trackingCallback: async (experiment, result) => {
    await logEvent("viewed_experiment", {
      experimentId: experiment.key,
      variationId: result.variationId.toString(),
    });
  },
});

export const growthbookSetAttributes = async () => {
  if (process.env.NODE_ENV === "development") return;
  const installationId = await analytics().getAppInstanceId();
  growthbook.setAttributes({
    id: installationId,
    company: "ribon",
  });
};

export const growthbookSetFeatures = () => {
  try {
    fetch(RIBON_GROWTHBOOK_URL)
      .then((res) => res.json())
      .then((parsed) => {
        growthbook.setFeatures(parsed.features);
      });
  } catch (e) {
    logError(e);
  }
};
