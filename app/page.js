"use client";

import React, { useState } from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { ImSun } from "react-icons/im";
import { FaDroplet, FaTemperatureHalf, FaWind } from "react-icons/fa6";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherWindy,
} from "react-icons/ti";
import Days from "./_components/date";

async function Search(e, location, setCurrentData) {
  e.preventDefault();
  const URL = "https://api.weatherapi.com/v1/";
  const api = "6d3f5b06015347b598d95409242901";

  const currRes = await fetch(
    `${URL}forecast.json?key=${api}&q=${location}&days=3&aqi=no&alerts=no`
  )
    .then((res) => res.json())
    .then((data) => data);
  setCurrentData(currRes);
}

export default function Home() {
  const [location, setLocation] = useState();
  const [currentData, setCurrentData] = useState({
    location: {
      name: "Chennai",
      region: "Tamil Nadu",
      country: "India",
      lat: 13.08,
      lon: 80.28,
      tz_id: "Asia/Kolkata",
      localtime_epoch: 1706528167,
      localtime: "2024-01-29 17:06",
    },
    current: {
      last_updated_epoch: 1706527800,
      last_updated: "2024-01-29 17:00",
      temp_c: 28.0,
      condition: {
        text: "snow",
      },
      wind_mph: 13.6,
      wind_kph: 22.0,
      cloud: 25,
      feelslike_c: 30.0,
      feelslike_f: 86.0,
      uv: 7.0,
    },
    forecast: {
      forecastday: [
        {
          date: "2024-01-29",
          date_epoch: 1706486400,
          day: {
            maxtemp_c: 26.8,
            maxtemp_f: 80.3,
            mintemp_c: 23.7,
            mintemp_f: 74.7,
            daily_chance_of_rain: 0,
          },
          hour: [
            {},
            {},
            {},
            {},
            {},
            {
              temp_c: 23.7,
              temp_f: 74.7,
              condition: {
                text: "Partly Cloudy ",
              },
            },
            {},
            {},
            {
              temp_c: 25.8,
              temp_f: 78.4,
              condition: {
                text: "Partly Cloudy ",
              },
            },
            {},
            {},
            {
              temp_c: 26.6,
              temp_f: 79.9,
              condition: {
                text: "Sunny",
              },
            },
            {},
            {},
            {
              temp_c: 26.2,
              temp_f: 79.2,
              condition: {
                text: "Sunny",
              },
            },
            {},
            {},
            {
              temp_c: 24.6,
              temp_f: 76.3,
              condition: {
                text: "Clear ",
              },
            },
          ],
        },
        {
          date: "2024-01-30",
          date_epoch: 1706572800,
          day: {
            maxtemp_c: 26.7,
            maxtemp_f: 80.0,
            mintemp_c: 22.5,
            mintemp_f: 72.5,
            condition: {
              text: "Sunny",
            },
          },
        },
        {
          date: "2024-01-31",
          date_epoch: 1706659200,
          day: {
            maxtemp_c: 27.5,
            maxtemp_f: 81.5,
            mintemp_c: 22.8,
            mintemp_f: 73.1,
            condition: {
              text: "Sunny",
            },
          },
        },
      ],
    },
  });
  function handleInput(e) {
    e.preventDefault();
    setLocation(e.target.value);
  }

  function displayIcon(val, size) {
    if (val.includes("Clear")) {
      return <ImSun fontSize={size} />;
    }
    if (val.includes("cast")) {
      return <TiWeatherCloudy fontSize={size} />;
    }
    if (val.includes("sunny") || val.includes("Sunny")) {
      return <ImSun fontSize={size} />;
    }
    if (val.includes("snow") || val.includes("Snow")) {
      return <TiWeatherSnow fontSize={size + 10} />;
    }
    if (val.includes("Partly") && val.includes("Cloudy")) {
      return <TiWeatherPartlySunny fontSize={size} />;
    }
    if (val.includes("Partly") && val.includes("rain")) {
      return <TiWeatherShower fontSize={size} />;
    }
    if (val.includes("wind")) {
      return <TiWeatherWindy fontSize={size} />;
    }
    if (val.includes("rain")) {
      return <TiWeatherDownpour fontSize={size} />;
    }
    if (val.includes("Clou")) {
      return <TiWeatherCloudy fontSize={size} />;
    }
    return <ImSun fontSize={size} />;
  }

  return (
    <div className={`p-0 xl:p-10`}>
      <nav className="relative flex p-3 items-center">
        <div className="w-10">
          <FaCanadianMapleLeaf fontSize={30} color="#0ea5e9" />
        </div>
        <form
          method="GET"
          className="w-1/2 xl:w-5/12 flex"
          onSubmit={(e) => Search(e, location, setCurrentData)}
        >
          <div className="w-full xl:pl-6">
            <input
              type="text"
              placeholder="Search"
              className="px-3 border border-blue-500 w-full rounded outline-none py-2 bg-inherit"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <button
            className="-ml-2 bg-sky-500 px-2 rounded font-medium"
            type="submit"
            style={{ borderRadius: "0px 4px 4px 0px" }}
          >
            Search
          </button>
        </form>
        <button
          className="absolute right-10 bg-sky-500 px-3 py-2 rounded font-medium"
          onClick={() => window.location.reload(true)}
        >
          Reload
        </button>
      </nav>
      <main className="p-7 mt-7 flex flex-col">
        <div className="flex flex-col xl:flex-row w-full mb-10">
          <section className="flex md:w-10/12 xl:w-7/12 justify-between items-center mb-0 md:mb-5 lg:mb-0">
            <div className="flex flex-col gap-16">
              <div className="">
                <h1 className="text-7xl">{currentData.location.name}</h1>
                <p className="text-gray-500 pl-2">
                  Chance on rain:
                  {currentData.forecast.forecastday[0].day.daily_chance_of_rain}
                  %
                </p>
              </div>
              <div>
                <h1 className="text-5xl">{currentData.current.temp_c}&deg;</h1>
              </div>
            </div>
            <div className="">
              {displayIcon(currentData.current.condition.text, 180)}
            </div>
          </section>
          <section className="flex gap-5 flex-col mt-6 xl:mt-0 xl:ml-10 xl:p-5 xl:w-4/12 rounded ">
            <p className="text-xl text-gray-500">3-DAY FORECAST</p>
            <div className="flex border-b-[1px] border-black h-14 items-center justify-between text-xl">
              <p>Today</p>
              <div className="flex items-start gap-2">
                {displayIcon(currentData.current.condition.text, 35)}
                <p>{currentData.current.condition.text}</p>
              </div>
              <p>
                {currentData.forecast.forecastday[0].day.mintemp_c}/
                {currentData.forecast.forecastday[0].day.maxtemp_c}
              </p>
            </div>
            <div className="flex h-14 border-b-[1px] border-black gap-5 text-xl items-center justify-between">
              <p>{Days(currentData.forecast.forecastday[1].date)}</p>
              <div className="flex items-start gap-2">
                {displayIcon(
                  currentData.forecast.forecastday[1].day.condition.text,
                  35
                )}
                <p>{currentData.forecast.forecastday[1].day.condition.text}</p>
              </div>
              {currentData.forecast.forecastday[1].day.mintemp_c}/
              {currentData.forecast.forecastday[1].day.maxtemp_c}
            </div>
            <div className="flex h-14 border-b-[1px] border-black gap-5 text-xl items-center justify-between">
              <p>{Days(currentData.forecast.forecastday[2].date)}</p>
              <div className="flex items-start gap-2">
                {displayIcon(
                  currentData.forecast.forecastday[2].day.condition.text,
                  35
                )}
                <p>{currentData.forecast.forecastday[2].day.condition.text}</p>
              </div>
              {currentData.forecast.forecastday[2].day.mintemp_c}/
              {currentData.forecast.forecastday[2].day.maxtemp_c}
            </div>
          </section>
        </div>
        <section className="flex flex-col">
          <p className="text-lg text-gray-500 mb-3">TODAY&apos;S FORECAST</p>
          <div className="flex xl:w-1/2 xl:ml-10 justify-between">
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg">6:00 AM</p>
              {displayIcon(
                currentData.forecast.forecastday[0].hour[5].condition.text,
                40
              )}
              <h4 className="text-2xl">
                {currentData.forecast.forecastday[0].hour[5].temp_c}&deg;
              </h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg">9:00 AM</p>
              {displayIcon(
                currentData.forecast.forecastday[0].hour[8].condition.text,
                40
              )}
              <h4 className="text-2xl">
                {currentData.forecast.forecastday[0].hour[8].temp_c}&deg;
              </h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg">12:00 PM</p>
              {displayIcon(
                currentData.forecast.forecastday[0].hour[11].condition.text,
                40
              )}
              <h4 className="text-2xl">
                {currentData.forecast.forecastday[0].hour[11].temp_c}&deg;
              </h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg">3:00 PM</p>
              {displayIcon(
                currentData.forecast.forecastday[0].hour[14].condition.text,
                40
              )}
              <h4 className="text-2xl">
                {currentData.forecast.forecastday[0].hour[14].temp_c}&deg;
              </h4>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <p className="text-lg">6:00 PM</p>
              {displayIcon(
                currentData.forecast.forecastday[0].hour[17].condition.text,
                40
              )}
              <h4 className="text-2xl">
                {currentData.forecast.forecastday[0].hour[17].temp_c}&deg;
              </h4>
            </div>
          </div>
        </section>
        <section className="flex flex-col mt-10">
          <p className="text-lg text-gray-500">AIR CONDITIONS</p>
          <div className="xl:w-1/2 mt-5 flex xl:items-center justify-around">
            <div className="">
              <div className="flex flex-col gap-3 p-2">
                <div className="flex items-center gap-3 text-lg">
                  <FaTemperatureHalf />
                  <p>Real Feal</p>
                </div>
                <p className="text-4xl">
                  {currentData.current.feelslike_c}&deg;
                </p>
              </div>
              <div className="flex flex-col gap-3 p-2">
                <div className="flex items-center gap-3 text-lg">
                  <FaWind />
                  <p>Wind</p>
                </div>
                <p className="text-4xl">{currentData.current.wind_kph} km/h</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3 p-2">
                <div className="flex items-center gap-3 text-lg">
                  <FaDroplet />
                  <p>Chance Of rain</p>
                </div>
                <p className="text-4xl">
                  {currentData.forecast.forecastday[0].day.daily_chance_of_rain}
                  %
                </p>
              </div>
              <div className="flex flex-col gap-3 p-2">
                <div className="flex items-center gap-3 text-lg">
                  <RiSettings5Fill />
                  <p>UV Index</p>
                </div>
                <p className="text-4xl">{currentData.current.uv}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
