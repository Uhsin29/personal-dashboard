import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Load saved count
  useEffect(() => {
    const saved = localStorage.getItem("count");
    if (saved) {
      setCount(Number(saved));
    }
  }, []);

  // Save count whenever it changes
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default Counter;
