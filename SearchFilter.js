import React, { useEffect, useState } from "react";

const StaticData = [
  {
    name: "Ram",
    age: 23,
    city: "Surat",
  },
  {
    name: "Kishan",
    age: 29,
    city: "Ahemdabad",
  },
  {
    name: "Vishnu",
    age: 25,
    city: "Mumbai",
  },
];

function SearchFilter() {
  const [data, setData] = useState(StaticData);
  const [searchD, setSearchD] = useState("");

  const [agead, setAgead] = useState("asc");

  const [apiData, setApiData] = useState();
  const handleChange = (e) => {
    setSearchD(e.target.value);
  };

  const handleEvent = () => {
    const sorted = [...data].sort((a, b) => {
      if (agead === "asc") {
        setData([...StaticData].sort((a, b) => a.age - b.age));
      } else {
        setData([...StaticData].sort((a, b) => b.age - a.age));
      }
    });
    setAgead(agead === "asc" ? "desc" : "asc");
    // console.log(sorted);
  };

  useEffect(() => {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=ab491a5d55be4fe2bda61912251609&q=London&aqi=no";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.location);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(apiData);
  const filtername = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchD.toLowerCase()) ||
      item.city.toLowerCase().includes(searchD.toLowerCase())
  );
  console.log(data, "0000000");

  return (
    <div>
      <input type="text" value={searchD} onChange={handleChange} />
      <button onClick={handleEvent}>
        {agead === "asc" ? "Descending" : "Ascending "}
      </button>

      <ul>
        {filtername.map((item) => (
          <li key={item.id}>
            {item.name} {item.age} {item.city}
          </li>
        ))}
      </ul>
      <div>
        {apiData && (
          <div>
            <h4>Weather Location :</h4>
            <p>
              {apiData.name}, {apiData.region}, {apiData.country}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFilter;
