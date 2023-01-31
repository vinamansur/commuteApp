import useSWR from "swr";
import { XMLParser } from "fast-xml-parser";

const xmlFetcher = (...args) => fetch(...args).then((res) => res.text());

export default function Ttc() {
  // fetch("https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7377").then((resp) => {
  //     return resp.text()
  // }).then((data)=> {
  //     // create an object to be parsed
  //      const parser = new DOMParser(), xmlDoc = parser.parseFromString(data, "text/xml")
  //      // getting route name
  //      console.log(xmlDoc.getElementsByTagName("prediction")[0].getAttribute("minutes"))
  //         })

  const { data } = useSWR(
    "https://webservices.umoiq.com/service/publicXMLFeed?command=predictions&a=ttc&stopId=7377",
    xmlFetcher
  );

  console.log(data)
//   const parser = new XMLParser()
//   const xmlDoc = parser.parse(data)

//   console.log(xmlDoc.getElementsByTagName("prediction")[0].getAttribute("minutes"))
}
