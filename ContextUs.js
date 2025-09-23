import React, { createContext, useState, useReducer } from "react";
import ReducerUs from "./ReducerUs";

export const textContext = createContext();
const Details = { count: 0 };

function countreducer(state, action) {
  switch (action.type) {
    case "Increment":
      return { count: state.count + 1 };
    case "Decrement":
      return {
        count: state.count - 1,
      };
    case "Reset":
      return { count: 0 };
    default:
      return state;
  }
}
function ContextUs() {
  const [text, setText] = useState("Count");
  const [state, dispatch] = useReducer(countreducer, Details);
  return (
    <div>
      <textContext.Provider value={{ state, dispatch }}>
        <ReducerUs />
      </textContext.Provider>
    </div>
  );
}

export default ContextUs;
