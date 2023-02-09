import useSWR from "swr";

// define the "fetcher" function.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Bikestats(props) {
  const { data } = useSWR(
    "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status",
    fetcher,
    {refreshInterval: 60000}
  );

  const station = data?.data.stations.find((st) => st.station_id == props.id);

  return (
    <>
      <ul>
        <li>E-bikes available: {station?.num_bikes_available_types.ebike}</li>
        <li>Mechanical bikes available: {station?.num_bikes_available_types.mechanical}</li>
        <li>Docks available: {station?.num_docks_available}</li>
      </ul>
    </>
  );
}
