import {
  useEffect,
  useRef,
  useState
} from 'react';

const useInterval = (callback: any , timerIsOn: boolean) => {
  const savedCallback = useRef();
  const [delay, setDelay] = useState(0)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null && timerIsOn) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

  useEffect(() => {
    if (timerIsOn){
      setDelay(1000)
    } else {
      setDelay(0)
    }
  }, [timerIsOn])
};

export default useInterval;