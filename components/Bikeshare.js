import useSWR from "swr";
import Bikestats from "./Bikestats";

// define the "fetcher" function.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Bikeshare() {
  const { data } = useSWR(
    "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information",
    fetcher
  );

  const station_ids = [7488, 7277, 7359, 7660];
  const station_list = [];

  station_ids.map((station) =>
    station_list.push(
      data?.data.stations.find((st) => st.station_id == station)
    )
  );

  return (
    <>
      {station_list.map((station, index) => (
        <>
          <h3 key={index}>{station?.name}</h3>
          <Bikestats id={station?.station_id} />
        </>
      ))}
    </>
  );
}
