import React, { useEffect, useState } from "react";

function ApiCall() {
  const [apiData, setApiData] = useState();
  const [searchD, setSearchD] = useState("");

  const handleChange = (e) => {
    setSearchD(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const url = `https://api.weatherapi.com/v1/current.json?key=ab491a5d55be4fe2bda61912251609&q=${searchD}&aqi=no`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then((data) => {
          setApiData(data);
        })
        .catch((error) => {
          setApiData(null);
        });
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchD]);

  console.log(apiData);

  return (
    <div>
      <input
        type="text"
        value={searchD}
        onChange={handleChange}
        placeholder="Enter City Name"
      />
      {apiData && (
        <div>
          <p>Region: {apiData.location.region}</p>
          <p>Time: {apiData.location.localtime}</p>
          <p>Country: {apiData.location.country}</p>
        </div>
      )}
    </div>
  );
}

export default ApiCall;
