export function stringToLocaleDateString(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

export function formatDateTime(dateString: string): string {
  const formattedDate = dateString
    .replace(/( \+|-)\d{4}$/, "")
    .split(" ")
    .join("T")
    .slice(0, -1);
  const date = new Date(formattedDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

export function add30DaysAndFormatDate(
  dateString: string,
  currentLang: string,
) {
  const formattedDate = dateString
    .replace(/( \+|-)\d{4}$/, "")
    .split(" ")
    .join("T")
    .slice(0, -1);
  const date = new Date(formattedDate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const originalDate = new Date(year, month, day);

  const newDate = new Date(originalDate);

  newDate.setDate(newDate.getDate() + 30);

  const locale = currentLang === "en" ? "en-US" : "pt-BR";

  return newDate.toLocaleDateString(locale);
}
