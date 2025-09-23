import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function USeeff() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCalculation(() => count * 2);
    }, 2000);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

export default USeeff;
