export function estimateArrival(createdAt, daysToAdd = 3) {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString();
}