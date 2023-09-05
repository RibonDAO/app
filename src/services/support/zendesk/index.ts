import ZendeskChat from "react-native-zendesk-chat";
import { REACT_APP_ZENDESK_IOS_KEY } from "utils/constants/Application";

export function initZendeskSupportChat(zendeskKey: string) {
  if (zendeskKey) {
    ZendeskChat.init(zendeskKey);
  }
}

export function startZendeskSupportChat() {
  ZendeskChat.init(REACT_APP_ZENDESK_IOS_KEY);
  ZendeskChat.startChat({});
}
