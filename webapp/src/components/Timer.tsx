import React, { useState } from "react";

import useInterval from '../hooks/useInterval';
import styled from 'styled-components'

type TypeTimer = {
};


const StyledClock = styled.span`
  padding-right: 10px;
`;

const Timer: React.FC<TypeTimer> = () => {
  let [time, setTime] = useState(0);

  useInterval(() => {
    const newTime = time + 1;
    setTime(newTime);
  }, 1000);


  return (
    <div>
      <StyledClock role="img" aria-label="clock" >
        ⏰
      </StyledClock>
      {time}
    </div>
  );
}

export default Timer
