import React, { use, useEffect, useState } from "react";

function Pagination() {
  const [apidata, setApiData] = useState([]);
  const [skipval, setSkipval] = useState(0);
  const [currentpage, setCurrentpage] = useState(1);
  const [searchD, setSearchD] = useState("");
  const [sortAD, setSortAD] = useState("asc");
  const [column, setColumn] = useState(null);
  const [load, setLoad] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [number, setNumber] = useState("");

  const fetchdata = () => {
    if (number) {
      const url = `https://dummyjson.com/products/search?q=${number}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLoad(false);
          setApiData(data);
        })
        .catch(() => {
          setApiData(null);
        });
    } else if (searchD) {
      const url = `https://dummyjson.com/products/search?q=${searchD}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLoad(false);
          setApiData(data);
        })
        .catch(() => {
          setApiData(null);
        });
    } else {
      const url = `https://dummyjson.com/products?limit=10&skip=${skipval}&select=title,price&q=${searchD}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLoad(false);
          setApiData(data);
        })
        .catch(() => {
          setApiData(null);
        });
    }
  };
  console.log(number);

  useEffect(() => {
    fetchdata();
  }, [searchD, currentpage]);
  if (load) {
    return <div>Loading</div>;
  }

  const pageNumbers = [];
  const totalPages = Math.ceil(apidata.total / 10);
  const startPage = Math.max(1, currentpage - Math.floor(2));
  const endPage = Math.min(totalPages, startPage + 3);

  const handlepage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentpage(page);
      setSkipval((page - 1) * 10);
    }
  };

  if (startPage > 1) {
    pageNumbers.push(1);
    if (startPage > 2) {
      pageNumbers.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  const handleNext = () => {
    setLoad(true);
    handlepage(currentpage + 1);
  };
  const handlePrev = () => {
    setLoad(true);
    handlepage(currentpage - 1);
  };

  const handleDelet = (id) => {
    const newdata = apidata.products.filter((item) => item.id !== id);
    setApiData({ ...apidata, products: newdata });

    // const newdata = apidata.products.splice(2, 1);
    // const newdata = apidata.products.slice(apidata.products.length - 1, 1);
    // console.log("newarray", newdata);
    // setApiData({...apidata,raj: {...apidata,products: [...newdata, { title: "hello" }, { title: apidata }],
    //   },
    // });
  };
  const handleEdit = (e) => {
    setInputValue(e);
    setNumber(e.id);
  };

  const handleform = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateitem = apidata.products.map((item) =>
      item.id === inputValue.id ? inputValue : item
    );

    setApiData({ ...apidata, products: updateitem });
    setInputValue("");
    setNumber("");
  };

  const handleSearch = (event) => {
    setSearchD(event.target.value);
  };

  const numberSearch = (event) => {
    const id = event.target.value;
    setNumber(id);

    const foundItem = apidata.products.find((item) => item.id === +id);
    foundItem ? setInputValue(foundItem) : setInputValue("");
  };

  const sorting = (Cname) => {
    const newSortOrder = column === Cname && sortAD === "asc" ? "desc" : "asc";
    setColumn(Cname);
    setSortAD(newSortOrder);

    const sortedata = [...apidata.products].sort((a, b) => {
      const valA = a[Cname];
      const valB = b[Cname];

      if (valA < valB) {
        return newSortOrder === "asc" ? -1 : 1;
      }

      if (valB < valA) {
        return newSortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setApiData({ products: sortedata });
  };

  return (
    <div>
      <input
        type="text"
        name="search-title-input"
        value={searchD}
        onChange={handleSearch}
        placeholder="Search by Title"
      ></input>
      <table>
        <thead>
          <tr>
            <th onClick={() => sorting("id")}>ID</th>
            <th onClick={() => sorting("title")}>Title</th>
            <th onClick={() => sorting("price")}>Price</th>
          </tr>
        </thead>
        <tbody>
          {apidata?.products?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <button type="delete" onClick={() => handleDelet(item.id)}>
                  delete
                </button>
              </td>
              <td>
                <button type="submit" onClick={() => handleEdit(item)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {skipval >= 10 ? (
        <button type="button" onClick={(e) => handlePrev(e)}>
          Previous
        </button>
      ) : (
        <button type="button" disabled="true">
          Previous
        </button>
      )}

      {skipval <= 180 ? (
        <button type="button" onClick={(e) => handleNext(e)}>
          Next
        </button>
      ) : (
        <button type="button">Next</button>
      )}

      <nav>
        <ul>
          {pageNumbers.map((page, index) => (
            <span key={index}>
              {page === "..." ? (
                <span>...</span>
              ) : (
                <button onClick={() => handlepage(page)}>{page}</button>
              )}
            </span>
          ))}
        </ul>
      </nav>

      {/* {inputValue && ( */}
      <form onSubmit={handleUpdate}>
        <div>
          Id :{" "}
          <input
            name="search-number-input"
            type="text"
            value={number || inputValue.id}
            onChange={numberSearch}
          ></input>
          <br />
          Title :{" "}
          <input
            type="text"
            value={inputValue.title}
            onChange={handleform}
            name="title"
          ></input>
          <br />
          Price :{" "}
          <input
            type="number"
            value={inputValue.price}
            onChange={handleform}
            name="price"
          ></input>
          <br />
          <button type="submit">Update</button>
        </div>
      </form>
      {/* )} */}
    </div>
  );
}

export default Pagination;
