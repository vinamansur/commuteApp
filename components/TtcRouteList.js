// FUTURE DEVELOPMENT

// import useSWR from "swr";

// // getting fast-xml-parser package
// const { XMLParser, XMLValidator } = require("fast-xml-parser");
// const options = {
//   ignoreAttributes: false,
//   attributeNamePrefix: "a_",
// };

// // define the "fetcher" function.
// const xmlFetcher = (...args) => fetch(...args).then((res) => res.text());

// export default function TtcRouteList() {
//   const { data } = useSWR(
//     "https://webservices.umoiq.com/service/publicXMLFeed?command=routeList&a=ttc",
//     xmlFetcher
//   );

//   //parsing from XML to JSON
//   const parser = new XMLParser(options);
//   if (data) {
//     const jsonData = parser.parse(data);
//     console.log(jsonData.body);
//     // const route = jsonData.body.predictions[1].a_routeTitle;
//     // const stop = jsonData.body.predictions[1].a_stopTitle;
//     // const predict =
//     //   jsonData.body.predictions[1].direction.prediction[0].a_minutes;

//     // return (
//     //   <>
//     //     <ul>
//     //       <li>Route: {route} </li>
//     //       <li>Stop: {stop} </li>
//     //       <li>
//     //         Arriving in:{" "}
//     //         <strong>
//     //           {predict} {predict == 1 ? "minute" : "minutes"}
//     //         </strong>
//     //       </li>
//     //     </ul>
//     //   </>
//     // );
//   }
// }
