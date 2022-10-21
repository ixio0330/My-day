function getDateTime(date: string) {
  return new Date(date).getTime();
}

export default function getDateDif(first: string, second: string) {
  if (!first || !second) {
    return 0;
  }
  return Math.abs((getDateTime(first) - getDateTime(second)) / (1000 * 60 * 60 * 24));
}