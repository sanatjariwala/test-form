import React, { useState } from "react";

function UseStat() {
  const [count, setCount] = useState(0);
  console.log(count);
  const shoot = (a, b) => {
    alert(b);
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click-{count}</button>
      <button onClick={(event) => shoot(event, "Goal!")}>Take the shot!</button>
    </div>
  );
}

export default UseStat;
