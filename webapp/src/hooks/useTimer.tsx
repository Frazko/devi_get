import { useEffect, useState } from "react";

import { isTimerOnSelector } from 'store/selectors/gameSelectors';
import { useSelector } from 'react-redux';

const useTimer = (over: boolean) => {
  const [time, setTime] = useState(0)
  const timerIsOn = useSelector(isTimerOnSelector);

  useEffect(() => {
    let intervalId: any;

    if (timerIsOn) {
      intervalId = setInterval(() => {
        const newTime = time + 1;
        setTime(newTime);
      }, 1000)
    }

    return () => clearInterval(intervalId);
  }, [timerIsOn, time])

  return {
    time,
    setTime,
  }
}

export default useTimer;