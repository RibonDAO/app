import { Languages } from "types/enums/Languages";

export function countryByLanguage(language: Languages) {
  if (language === Languages.PT) return "Brasil";

  return "United States";
}

export function countryCodeByLanguage(language: Languages) {
  if (language === Languages.PT) return "BR";

  return "US";
}
