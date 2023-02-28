import useSWR from "swr";
import { Card } from "react-bootstrap";

// define the "fetcher" function.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Weather() {
  const { data, error } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=43.68668&lon=-79.37468&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`,
    fetcher,
    { refreshInterval: 3600000 }
  );

  return (
    <>
      <ul>
        <li>Condition: {data?.weather[0].description}</li>
        <li>Temperature: {Math.round(data?.main.temp)} °C</li>
        <li>Feels like: {Math.round(data?.main.feels_like)} °C</li>
        <li>Wind speed: {Math.round(data?.wind.speed * 3.6)} km/h</li>
      </ul>
    </>
  );
}
