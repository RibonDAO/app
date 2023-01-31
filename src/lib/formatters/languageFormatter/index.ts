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
