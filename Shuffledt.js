import React, { useState, useEffect } from "react";

function Shuffle() {
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

  const [jokeOrder, setJokeOrder] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentJoke, setCurrentJoke] = useState(null);

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize joke order on first render
  useEffect(() => {
    const indices = datajoke.map((_, index) => index);
    setJokeOrder(shuffleArray(indices));
    setCurrentIndex(0);
  }, []);

  const handleNextJoke = () => {
    if (jokeOrder.length === 0) return;

    // If we’ve reached the end, reshuffle and restart
    if (currentIndex >= jokeOrder.length) {
      const reshuffled = shuffleArray(datajoke.map((_, index) => index));
      setJokeOrder(reshuffled);
      setCurrentIndex(0);
      setCurrentJoke(datajoke[reshuffled[0]]);
    } else {
      const nextIndex = currentIndex;
      const jokeIndex = jokeOrder[nextIndex];
      setCurrentJoke(datajoke[jokeIndex]);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div>
      {currentJoke && (
        <div>
          <p>
            <strong>Joke #{currentJoke.id}</strong>
          </p>
          <p>{currentJoke.setup}</p>
          <p>
            <em>{currentJoke.punchline}</em>
          </p>
        </div>
      )}
      <button onClick={handleNextJoke}>
        {currentIndex >= jokeOrder.length ? "Restart Jokes" : "Next Joke"}
      </button>
    </div>
  );
}

export default Shuffle;
