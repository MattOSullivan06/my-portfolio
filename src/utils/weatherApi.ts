import type { Weather } from "~/types/Weather";

export async function getWeather(): Promise<Weather> {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=33.4484&longitude=112.0740&current=temperature_2m,wind_speed_10m,relative_humidity_2m"
  );

  return response.json() as Promise<Weather>;
}
