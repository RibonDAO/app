import ZendeskChat from "react-native-zendesk-chat";

export default function initializeChat() {
  console.log(ZendeskChat);
  ZendeskChat.init("vrDO3ZfAfTCukR1rtC4SGd0TkvUbOM0n");

  ZendeskChat.startChat({
    name: "Nicholas",
    email: "nicholas@ribon.io",
  });
}