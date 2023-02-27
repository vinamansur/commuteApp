import useSWR from "swr";

// define the "fetcher" function.
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Viarail() {
    fetch('https://tsimobile.viarail.ca/data/allData.json')
    .then((response) => response.json())
    .then((data) => console.log(data));
  
  
  
  

  

// const trainPredict = data?.data[59].times[10].eta

  return (
    <>
      Via Rail arriving in Toronto in X minutes.
    </>
  );
}
