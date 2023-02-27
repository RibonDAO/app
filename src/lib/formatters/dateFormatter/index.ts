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
