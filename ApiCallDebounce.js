import React, { useEffect, useCallback, useState } from "react";
import { debounce } from "lodash";

function ApiCallDebounce() {
  const [apiData, setApiData] = useState();
  const [searchD, setSearchD] = useState([]);
  const [save, setSave] = useState([]);

  const handleChange = (e) => {
    setSearchD(e.target.value);
    delayedSearch(searchD);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSave([...save, apiData.location]);
  };

  const handleDelete = (e, input) => {
    e.preventDefault();
    save.splice(input, 1); // number
    // const newData = save.filter((dt) => dt.name !== input);  //with name
    setSave(save);
  };

  const performSearch = (searchD) => {
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
  };

  // console.log("apidata", apiData);

  const delayedSearch = useCallback(
    debounce((searchD) => performSearch(searchD), 1000),
    []
  );

  useEffect(() => {
    return () => {
      delayedSearch.cancel();
    };
  }, [delayedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchD}
        onChange={handleChange}
        placeholder="Enter City Name"
      />
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
      <button type="button" onClick={(e) => handleDelete(e, searchD - 1)}>
        Delete
      </button>

      {apiData && (
        <div>
          <br></br>
          <li>Region: {apiData.location.region}</li>
          <li>Time: {apiData.location.localtime}</li>
          <li>Country: {apiData.location.country}</li>
        </div>
      )}
    </div>
  );
}

export default ApiCallDebounce;
