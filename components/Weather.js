import useSWR from "swr";
import { useState, useEffect } from "react";

// define the "fetcher" function.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Weather() {
  {
    /* get user location, if available */
  }
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setUserLat(coords.latitude);
        setUserLong(coords.longitude);
      });
    }
  }, []);

  const { data, error } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`,
    fetcher,
    { refreshInterval: 3600000 }
  );

  if (data?.cod != 400) {
    return (
      <>
        <h2>
          {" "}
          Weather now in <strong>{data?.name}</strong>
        </h2>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="maintemp">
                  {" "}
                  {Math.round(data?.main.temp)}°C{" "}
                </div>
                <div className="description">
                  {data?.weather[0].description}
                </div>
                <div>Wind speed {Math.round(data?.wind.speed * 3.6)} km/h</div>
                <div>
                  Feels like{" "}
                  <strong>{Math.round(data?.main.feels_like)}°C</strong>
                </div>
              </td>
              <td>
                <img width="130px"
                  src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                ></img>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <br />
        <p>Please allow location to visualize weather info</p>
      </>
    );
  }
}
