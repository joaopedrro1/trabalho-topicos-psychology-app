export default function WeekInMinutes(dayWeek, hour, minute) {
  let dayConvertido = dayWeek * 24 * 60;
  let hourConvertido = hour * 60;
  let minutesConvertido = minute;

  return dayConvertido + hourConvertido + minutesConvertido;
}
