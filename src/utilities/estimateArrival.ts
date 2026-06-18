export function estimateArrival(
  createdAt: string | number | Date,
  daysToAdd: number = 3,
): string {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString();
}