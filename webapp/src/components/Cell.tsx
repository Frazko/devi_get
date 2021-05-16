import React from 'react'
import styled from 'styled-components'


type TypeCell = {
  index: number;
  value: number;
  xpos: number;
  ypos: number;
  flagged: boolean;
  mine: boolean;
  revealed: boolean;
};

const Cell: React.FC<TypeCell> = ({
  index,
  value,
  xpos,
  ypos,
  flagged,
  mine,
  revealed,
}) => {

  const StyledCell = styled.div`
    width: 40px;
    height: 40px;

    background-color: beige;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:15px;
    position: absolute;
    left: ${xpos * 40}px;
    top: ${ypos * 40}px;
    background: ${(index + xpos) % 2 === 0 ? "#A2D049" : "#AAD751"}
  `;

  const selectCell = (x: number, y: number) => {
    console.log('Clicked on', x, y);
  };

  return (
    <StyledCell
      onClick={() => selectCell(xpos, ypos)}
    >

    </StyledCell>
  )
}

export default Cell
