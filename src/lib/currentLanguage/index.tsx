import { getLocalStorageItem } from "lib/localStorage";

export const LANGUAGE_KEY = "LANGUAGE_KEY";

export function formattedLanguage(language: string | null) {
  switch (language) {
    case "en-US":
      return "en";
    case "pt-BR":
      return "pt-BR";
    default:
      return "pt-BR";
  }
}

export async function normalizedLanguage(): Promise<string> {
  const language = await getLocalStorageItem(LANGUAGE_KEY);
  return formattedLanguage(language);
}
