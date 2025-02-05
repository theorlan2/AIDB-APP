import { useEffect, useState } from "react";

const useTimer = (isRunning: boolean) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<number | undefined>();

  const startTimerCounter = () => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 59) {
            setMinutes(minutes + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    setIntervalId(interval);
    return interval;
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (isRunning) {
      startTimerCounter();
    } else {
      stopTimer();
    }
    return () => {
      setMinutes(0);
      setSeconds(0);
    };
  }, [isRunning]);

  const formatTime = () => {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return {
    time: formatTime(),
    isRunning,
    startTimer: () => {
      setMinutes(0);
      setSeconds(0);
      startTimerCounter();
    },
    stopTimer,
  };
};
export default useTimer;
