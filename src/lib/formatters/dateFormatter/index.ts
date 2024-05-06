import { formattedShortLanguage } from "lib/currentLanguage";

export function stringToLocaleDateString(dateString: string) {
  const formattedDate = dateString
    .replace(/( \+|-)\d{4}$/, "")
    .split(" ")
    .join("T")
    .slice(0, -1);
  return new Date(formattedDate).toLocaleDateString();
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

  const locale = formattedShortLanguage(currentLang);

  return newDate.toLocaleDateString(locale);
}

export const getTimeUntilMidnight = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 1, 0, 0);
  return new Date(tomorrow.getTime() - now.getTime())
    .toUTCString()
    .slice(17, 22);
};
