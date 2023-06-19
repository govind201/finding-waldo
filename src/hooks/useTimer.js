import { useState } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState(0);

  const count = () => {
    setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  return { timer, count };
};

export default useTimer;
