import React, { useEffect, useState } from "react";

function RandomJoke() {
  const datajoke = [
    {
      id: "1",
      setup: "What did the fish say when it hit the wall?",
      punchline: "Dam.",
    },
    {
      id: "2",
      setup: "How do you make a tissue dance?",
      punchline: "You put a little boogie on it.",
    },
    {
      id: "3",
      setup: "What's Forrest Gump's password?",
      punchline: "1Forrest1",
    },
    {
      id: "4",
      setup: "What do you call a belt made out of watches?",
      punchline: "A waist of time.",
    },
    {
      id: "5",
      setup: "Why can't bicycles stand on their own?",
      punchline: "They are two tired",
    },
    {
      id: "6",
      setup: "How does a train eat?",
      punchline: "It goes chew, chew",
    },
  ];

  //   const url = `https://sv443.net/jokeapi/v2/joke/Programming?type=single`;
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Joke not found");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setApiData(data);
  //     })
  //     .catch((error) => {
  //       setApiData(null);
  //     });

  const [joke, setJoke] = useState(datajoke);
  const [data, setData] = useState([]);
  const [store, setStore] = useState([]);

  // useEffect(() => {
  //   if (joke.length > 0) {
  //     handleSubmit();
  //   }
  // }, []);

  function handleSubmit() {
    if (joke.length !== 0) {
      const randomIndex = Math.floor(Math.random() * joke.length);
      const selectedItem = joke[randomIndex];
      setData(selectedItem);

      const updatedjoke = joke.filter((item) => item.id !== selectedItem.id);
      setJoke(updatedjoke);
      setStore([...store, selectedItem.id]);
    } else if (joke.length === 0) {
      setJoke(datajoke);
    }
  }

  // console.log("upd joke ", data);
  // console.log("update", joke);

  return (
    <div>
      <button type="button" onClick={handleSubmit}>
        CLick
      </button>

      <div>
        <p>{data.id} </p>
        <p>{data.setup}</p>
        <p>{data.punchline}</p>
      </div>

      <ol>
        {store.map((store, index) => (
          <li key={index}>{store}</li>
        ))}
      </ol>
    </div>
  );
}

export default RandomJoke;
