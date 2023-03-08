import OnboardingImage from "assets/images/onboarding.png";
import { Image } from "react-native";

export const RibonOnboarding = (t: any) => ({
  id: 1,
  title: t("onboarding.title"),
  author: {
    id: 1,
    name: "Ribon",
  },
  visible: true,
  publishedAt: new Date().toISOString(),
  publishedAtInWords: t("onboarding.publishedAt"),
  createdAt: "2021-09-01T00:00:00.000Z",
  updatedAt: "2021-09-01T00:00:00.000Z",
  imageUrl: Image.resolveAssetSource(OnboardingImage).uri,
});
