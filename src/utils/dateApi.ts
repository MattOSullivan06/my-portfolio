import type { DateData, FormattedDate } from "~/types/Date";

export async function getFormattedDate(): Promise<FormattedDate> {
  const response = await fetch("https://api.ipify.org?format=json");
  const { ip }: { ip: string } = await response.json();
  const dateResponse = await fetch(`http://worldtimeapi.org/api/ip/${ip}`);
  const jsonData: DateData = await dateResponse.json();

  const { datetime } = jsonData;

  const date = new Date(datetime);
  const dayOfWeek = getDayOfWeek(date);
  const dateText = formatDateText(date);
  const formattedDate = `${date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;

  return { dayOfWeek, dateText, formattedDate };
}

function getDayOfWeek(date: Date): string | undefined {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

function formatDateText(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "2-digit", year: "numeric" };
  let dateText = date.toLocaleDateString("en-US", options);
  dateText = dateText.replace(/,/g, "");
  return dateText;
}
