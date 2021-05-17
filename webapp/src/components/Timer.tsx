import React, { useEffect } from "react";

import styled from 'styled-components'
import useTimer from '../hooks/useTimer';


const Wrapper = styled.div`
  width: 80px;
`;
const StyledClock = styled.span`
  padding-right: 10px;
`;

type TimerType = {
  over: boolean
}

const Timer: React.FC<TimerType> = ({ over }) => {
  const {time, setTime} = useTimer(over);
  
  useEffect(() => {
    if (over) {
      setTime(0);
    }
  }, [over])

  return (
    <Wrapper>
      <StyledClock role="img" aria-label="clock" >
        ⏰
      </StyledClock>
      {time}
    </Wrapper>
  );
}

export default Timer
