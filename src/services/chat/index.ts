import { Platform } from 'react-native';
import {
  initialize,
  showMessaging,
} from '@flashcoffee/react-native-zendesk-messaging';
import Config from 'react-native-config';

export default function initializeChat() {
  initialize(
    Platform.OS === 'android'
      ? 'Config.CHANNEL_KEY_ANDROID'
      : 'Config.CHANNEL_KEY_IOS'
  );
}

export function startChat() {
  showMessaging();
}
