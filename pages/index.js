import Weather from "../components/Weather";
import Bikeshare from "../components/Bikeshare";
import TtcRouteDetails from "../components/TtcRouteDetails";

export default function Home() {
  return (
    <>
      <h1>CommuteApp</h1>
      <em>A helper on your daily commute</em>
      <Weather />
      <br />
      <h2> TTC info </h2>
      <TtcRouteDetails />
      <br />
      <h2> Bike Share Toronto - info</h2>
      <Bikeshare />
    </>
  );
}
