import { getLocalStorageItem } from "lib/localStorage";
import { Languages } from "@ribon.io/shared/types";

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

export function formattedShortLanguage(language: string | null): Languages {
  switch (language) {
    case "en-US":
      return Languages.EN;
    case "en":
      return Languages.EN;
    case "pt":
      return Languages.PT;
    case "pt-BR":
      return Languages.PT;
    default:
      return Languages.PT;
  }
}

export async function normalizedLanguage(): Promise<string> {
  const language = await getLocalStorageItem(LANGUAGE_KEY);
  return formattedLanguage(language);
}
