"use client";

import React, { useEffect, useState } from "react";
import Header from "~/components/Header";
import Card from "~/components/Card";
import { getWeather } from "~/utils/weatherApi";
import { getFormattedDate } from "~/utils/dateApi";
import { Weather } from "~/types/Weather";
import { getCatFact } from "~/utils/catFactApi";

export default function HomePage() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<string | undefined>("");
  const [dateText, setDateText] = useState<string | undefined>("");
  const [formattedDate, setFormattedDate] = useState<string | undefined>(
    "Loading...",
  );
  const [catFact, setCatFact] = useState<string>("Loading...");

  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("hello");

      try {
        console.log("try");

        const [weatherData, dateData, catFactResponse] = await Promise.all([
          getWeather(),
          getFormattedDate(),
          getCatFact(),
        ]);

        setWeather(weatherData);
        setDayOfWeek(dateData.dayOfWeek);
        setDateText(dateData.dateText);
        setFormattedDate(dateData.formattedDate);
        setCatFact(catFactResponse.data);
      } catch (error) {
        console.log("catch");

        console.error("Failed to fetch data:", error);
      }
    }

    if (typeof window !== "undefined") {
      fetchData().catch((error) => console.error("Error in fetchData:", error));
    }

    // Return a cleanup function to satisfy useEffect requirements
    return () => {
      // No cleanup needed
      // Add any cleanup logic here if required in the future
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="flex min-h-screen items-center justify-center">
        <div className="grid h-[750px] w-[1000px] grid-cols-2 md:grid-cols-2">
          <div className="flex h-[300px] w-[500px] items-center justify-start pb-14 pl-12">
            {dayOfWeek && dateText && formattedDate ? (
              <div className="font-inter pr-1 text-5xl font-bold tracking-normal text-black">
                <div>
                  <div>{`It's ${dayOfWeek},`}</div>
                </div>
                <div>{dateText}</div>
                <div>at {formattedDate}</div>
              </div>
            ) : (
              <div className="font-inter pr-1 text-5xl font-bold tracking-normal text-black">
                Loading...
              </div>
            )}
          </div>
          <div className="flex h-[300px] items-center justify-center p-4">
            <Card label="About Me">
              <div className="text">
                <p>
                  My name is Matt! I was a law student who switched to software.
                  I enjoy playing squash, pickleball, and board games.
                </p>

                <br />
                <p>
                  My favorite programming languages are JavaScript, TypeScript,
                  and Python!
                </p>
              </div>
            </Card>
          </div>
          <div className="flex h-[300px] items-center justify-center p-4">
            {weather ? (
              <Card label="Scottsdale, AZ">
                <div>
                  <p className="pt-6 text-6xl font-bold">
                    {celsiusToFahrenheit(weather.current.temperature_2m)}°F
                  </p>
                  <p className="pt-6 text-xl font-bold">
                    Wind Speed (km/h): {weather.current.wind_speed_10m} km/h
                  </p>
                  <p className="pt-2 text-xl font-bold">
                    Humidity: {weather.current.relative_humidity_2m}%
                  </p>
                </div>
              </Card>
            ) : (
              <Card label="Scottsdale, AZ">
                <div className="text-md">Loading weather data...</div>
              </Card>
            )}
          </div>

          <div className="flex h-[300px] items-center justify-center p-4">
            <Card label="Cat Fact">
              <div>{catFact}</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
