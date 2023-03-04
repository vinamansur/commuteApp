import useSWR from "swr";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { icon } from "leaflet";
import { useEffect, useState } from "react";
import "leaflet-rotatedmarker";

// getting fast-xml-parser package
const { XMLParser, XMLValidator } = require("fast-xml-parser");
const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "a_",
};

// creating customized icons
const busIcon = icon({
  iconUrl: "/arrow.png",
  iconSize: [32, 32],
});
const locationIcon = icon({
  iconUrl: "/location.png",
  iconSize: [32, 32],
});

// define the "fetcher" function.
const xmlFetcher = (...args) => fetch(...args).then((res) => res.text());

export default function Map(props) {
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

  // fetching vehicle location data
  const { data } = useSWR(
    "https://webservices.umoiq.com/service/publicXMLFeed?command=vehicleLocations&a=ttc&r=82&t=0",
    xmlFetcher,
    { refreshInterval: 10000 }
  );

  //parsing from XML to JSON
  const parser = new XMLParser(options);
  if(data) {
    const jsonData = parser.parse(data);
    if (jsonData.body.vehicle) {
      const latitude = jsonData.body.vehicle.a_lat;
      const longitude = jsonData.body.vehicle.a_lon;
      const vehicleId = jsonData.body.vehicle.a_id;
      const lastUpdate = jsonData.body.vehicle.a_secsSinceReport;
      const heading = jsonData.body.vehicle.a_heading;
      
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
        <Marker position={[latitude, longitude]} icon={busIcon} rotationAngle={heading}>
          <Popup>
            Vehicle ID: {vehicleId}
            <br />
            Last update: {lastUpdate} seconds ago
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}
}
