import useSWR from "swr";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet-rotatedmarker";

const { XMLParser } = require("fast-xml-parser");
const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "a_",
};

const busIcon = icon({
  iconUrl: "/arrow.png",
  iconSize: [24, 24],
});
const locationIcon = icon({
  iconUrl: "/location.png",
  iconSize: [32, 32],
});

const xmlFetcher = (...args) => fetch(...args).then((res) => res.text());

export default function Map(props) {
  const [userLat, setUserLat] = useState();
  const [userLong, setUserLong] = useState();
  const markerRef = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setUserLat(coords.latitude);
        setUserLong(coords.longitude);
      });
    }
  }, []);

  const { data } = useSWR(
    "https://webservices.umoiq.com/service/publicXMLFeed?command=vehicleLocations&a=ttc&r=82&t=0",
    xmlFetcher,
    { refreshInterval: 10000 }
  );

  const parser = new XMLParser(options);
  let latitude, longitude, vehicleId, lastUpdate, heading;

  if (data) {
    const jsonData = parser.parse(data);
    if (jsonData.body.vehicle) {
      latitude = jsonData.body.vehicle.a_lat;
      longitude = jsonData.body.vehicle.a_lon;
      vehicleId = jsonData.body.vehicle.a_id;
      lastUpdate = jsonData.body.vehicle.a_secsSinceReport;
      heading = jsonData.body.vehicle.a_heading;
    }
  }

  // Always run this effect, even if heading is undefined
  useEffect(() => {
    if (markerRef.current && heading !== undefined) {
      markerRef.current.setRotationAngle(heading);
    }
  }, [heading]);

  if (!latitude || !longitude) return null;

  return (
    <MapContainer
      center={[43.68192607423363, -79.38021893174823]}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors <br><a href="https://www.flaticon.com/free-icons/location" title="location icons">Icons created by Pixel perfect - Flaticon</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* user position marker */}
      {userLat && (
        <Marker position={[userLat, userLong]} icon={locationIcon}></Marker>
      )}

      {/* Vehicle marker */}
      <Marker
        ref={markerRef}
        position={[latitude, longitude]}
        icon={busIcon}
        rotationAngle={heading}
        rotationOrigin="center"
      >
        <Popup>
          Vehicle ID: {vehicleId}
          <br />
          Last update: {lastUpdate} seconds ago
        </Popup>
      </Marker>
    </MapContainer>
  );
}
