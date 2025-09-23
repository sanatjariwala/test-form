import React, { useReducer, useContext } from "react";
import { textContext } from "./ContextUs";

// const Details = { count: 0 };

// function countreducer(state, action) {
//   switch (action.type) {
//     case "Increment":
//       return { count: state.count + 1 };
//     case "Decrement":
//       return {
//         count: state.count - 1,
//       };
//     case "Reset":
//       return { count: 0 };
//     default:
//       return state;
//   }
// }
function ReducerUs() {
  const { state, dispatch } = useContext(textContext);

  //   const [state, dispatch] = useReducer(countreducer, Details);
  return (
    <div>
      count : {state.count}
      <button onClick={() => dispatch({ type: "Increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "Decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "Reset" })}>Reset</button>
    </div>
  );
}

export default ReducerUs;
