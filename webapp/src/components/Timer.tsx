import React, { useState } from "react";

import useInterval from '../hooks/useInterval';
import styled from 'styled-components'

import { isTimerOnSelector, timerSelector } from 'store/selectors/gameSelectors';
import { useSelector, useDispatch } from 'react-redux';
import { setTimerActionCreator } from '../store/reducers/minesweeperReducer';


const Wrapper = styled.div`
  width: 80px;
`;
const StyledClock = styled.span`
  padding-right: 10px;
`;

const Timer = () => {
  const time = useSelector(timerSelector);
  const timerIsOn = useSelector(isTimerOnSelector);
    const dispatch = useDispatch();

  useInterval(() => {
    const newTime = time + 1;
    dispatch(setTimerActionCreator(newTime));
  }, timerIsOn);

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
