import { Currencies } from "@ribon.io/shared/types";
import { Languages } from "types/enums/Languages";

export function countryByLanguage(language: Languages) {
  if (language === Languages.PT) return "BR";

  return "US";
}
