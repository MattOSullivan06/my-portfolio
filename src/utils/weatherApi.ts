import type { Weather } from "~/types/Weather";

export async function getWeather(): Promise<Weather> {
  try {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=33.4484&longitude=112.0740&current=temperature_2m,wind_speed_10m,relative_humidity_2m"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData: Weather = await response.json() as Weather;

    // Validate weather data here if needed

    return weatherData as Weather;
  } catch (error) {
    // Handle errors
    console.error("Error fetching weather data:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}
