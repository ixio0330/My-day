export function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function getTomorrow() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toLocaleString().replaceAll('. ', '-').slice(0, 10);
}

export function getYesterday() {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  return today.toLocaleString().replaceAll('. ', '-').slice(0, 10);
}