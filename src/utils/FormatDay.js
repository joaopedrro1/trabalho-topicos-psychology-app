export default function formatDay(week_day) {
  return week_day === 1
    ? "Segunda-feira"
    : week_day === 2
    ? "Terça-feira"
    : week_day === 3
    ? "Quarta-feira"
    : week_day === 4
    ? "Quinta-feira"
    : week_day === 5
    ? "Sexta-feira"
    : "";
}
