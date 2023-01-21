import AsyncStorage from "@react-native-async-storage/async-storage";
import { Languages } from "@ribon.io/shared";

export async function setLocalStorageItem(key: string, value: string) {
  return AsyncStorage.setItem(key, value);
}

export function getLocalStorageItem(
  key: string,
): Promise<Languages | string | null> {
  return AsyncStorage.getItem(key);
}

export async function removeLocalStorageItem(key: string) {
  return AsyncStorage.removeItem(key);
}
