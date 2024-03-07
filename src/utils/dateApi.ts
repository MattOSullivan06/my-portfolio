import { DateData, FormattedDate} from "~/types/Date";

export async function getFormattedDate(): Promise<FormattedDate> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const { ip } = await response.json();
    const dateResponse = await fetch(`http://worldtimeapi.org/api/ip/${ip}`);
    const jsonData: DateData = await dateResponse.json();

    if (!("abbreviation" in jsonData && "datetime" in jsonData)) {
      throw new Error('Failed to fetch abbreviation or datetime');
    }

    const { abbreviation, datetime } = jsonData;

    if (!abbreviation || !datetime) {
      throw new Error('Failed to fetch abbreviation or datetime');
    }

    const date = new Date(datetime);
    const dayOfWeek = getDayOfWeek(date);
    const dateText = formatDateText(date);
    const formattedDate = `${date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;

    return { dayOfWeek, dateText, formattedDate };
  } catch (error: any) {
    console.error("Error fetching date data:", error.message);
    throw new Error("Failed to fetch date data");
  }
}

function getDayOfWeek(date: Date): string | undefined{
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

