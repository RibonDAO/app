export const formatCountdown = (count: number[]) => {
  return count
    .toString()
    .split(",")
    .map((part) => part.trim().padStart(2, "0"))
    .join(":");
};
