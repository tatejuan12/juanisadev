export default function ampm() {
  const date = new Date();
  const hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  return ampm;
}
