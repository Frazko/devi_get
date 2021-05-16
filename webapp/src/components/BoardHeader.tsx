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

const BoardHeader = () => {
  return (
    <Wrapper>
      <h1>Deviget Minesweeper</h1>
      <Timer />
    </Wrapper>
  )
}

export default BoardHeader

