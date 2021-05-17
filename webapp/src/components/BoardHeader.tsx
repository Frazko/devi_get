import React from 'react'
import styled from 'styled-components';
import Timer from './Timer';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type HeaderType = {
  over?: boolean;
  hideClock?: boolean;
}

const BoardHeader: React.FC<HeaderType> = ({ over , hideClock}) => {
  return (
    <Wrapper>
      <h1>Deviget Minesweeper</h1>
      {!hideClock && <Timer over={!!over} />}
    </Wrapper>
  )
}

export default BoardHeader

