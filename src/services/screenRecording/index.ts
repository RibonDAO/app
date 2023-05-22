import Smartlook from "react-native-smartlook-analytics";

export default function startScreenRecording() {
  Smartlook.instance.preferences.setProjectKey(
    "2dd1f6a9ffa088459f319628005c219bfdd67a71",
  );
  Smartlook.instance.preferences.setAdaptiveFrameRateEnabled(false);
  Smartlook.instance.start();
}
