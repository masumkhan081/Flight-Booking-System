export function getDateTime(str) {
  const date = new Date(str);

  return (
    date.getDate() +
    "." +
    date.getMonth() +
    "." +
    date.getFullYear() +
    " (" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ")"
  );
}
