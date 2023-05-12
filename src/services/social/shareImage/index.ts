import { fetchBase64FromUrl } from "lib/base64fetch";
import Share, { Social } from "react-native-share";

export const SocialTypes = Share.Social;
export const shareSocial = async (imageUrl: string, social: Social) => {
  const base64 = await fetchBase64FromUrl(imageUrl);
  const commonShareOptions = {
    title: "Let's donate with Ribon",
    message: "Donate with us",
    type: "image/jpeg",
    social,
  };

  const shareOptions: any = { ...commonShareOptions };
  if (social === Share.Social.INSTAGRAM_STORIES) {
    shareOptions.stickerImage = `data:image/png;base64,${base64}`;
    shareOptions.appId = "123";
  } else {
    shareOptions.url = `data:image/png;base64,${base64}`;
  }

  await Share.shareSingle(shareOptions);
};
