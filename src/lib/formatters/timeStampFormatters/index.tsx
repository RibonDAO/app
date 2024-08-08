export function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString().toString();
}

export function formatDateTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString().toString();
}
