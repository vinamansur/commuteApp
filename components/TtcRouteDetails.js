import useSWR from "swr";

import dynamic from "next/dynamic";

const RouteMap = dynamic(() => import("./Map"), { ssr: false, refreshInterval: 10000 });

// getting fast-xml-parser package
const { XMLParser, XMLValidator } = require("fast-xml-parser");
const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "a_",
};

// define the "fetcher" function.
const xmlFetcher = (...args) => fetch(...args).then((res) => res.text());

export default function TtcRouteDetails() {
  const { data } = useSWR(
    "https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7377",
    xmlFetcher,
    { refreshInterval: 30000 }
  );

  //parsing from XML to JSON
  const parser = new XMLParser(options);
  if (data) {
    const jsonData = parser.parse(data);
    console.log(jsonData.body);
    if(jsonData.body.predictions){
      const route = jsonData.body.predictions.a_routeTitle;
      const stop = jsonData.body.predictions.a_stopTitle;
      const predict =
      jsonData.body.predictions.direction.prediction[0].a_minutes;
      
      return (
        <>
        <RouteMap />
        <ul>
          <li>Route: {route} </li>
          <li>Stop: {stop} </li>
          <li>
            Arriving in:{" "}
            <strong>
              {predict} {predict == 1 ? "minute" : "minutes"}
            </strong>
          </li>
        </ul>
      </>
    );
  }
  }
}
