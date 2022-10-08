import useSWR from 'swr';

// define the "fetcher" function.  
const fetcher = (...args) => fetch(...args).then((res) => res.json()); 

export default function Weather() {
  const { data, error } = useSWR('https://api.openweathermap.org/data/2.5/weather?lat=43.68668&lon=-79.37468&appid=329dee17b010e59068874ab7805a804b&units=metric', fetcher);

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