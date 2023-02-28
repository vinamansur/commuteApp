import Weather from "../components/Weather";
import Bikeshare from "../components/Bikeshare";
import TtcRouteDetails from "../components/TtcRouteDetails";

export default function Home() {
  return (
    <>
      <h1> Weather now in Toronto - ON</h1>
      <Weather />
      <br />
      <h1> TTC info</h1>
      <TtcRouteDetails />
      <br />
      <h1> Bike Share Toronto - info</h1>
      <Bikeshare />
    </>
  );
}
