import React, { useContext } from "react";
import { textContext } from "../App";

function Form() {
  const { state, dispatch } = useContext(textContext);

  const handleChange = (e) => {
    dispatch({
      type: "Input",
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "Submit" });
  };
  //   console.log(state.text);
  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch({ type: "Delete", payload: id });
    console.log("000", id);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={state.text} onChange={handleChange} />
          <button type="submit">Submit</button>

          <ul>
            {state.items.map((item) => (
              <li key={item.id}>
                {item.text}
                <button type="button" onClick={(e) => handleDelete(e, item.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Form;
