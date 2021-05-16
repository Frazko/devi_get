import React from 'react'
import styled from 'styled-components'
import { CELL_SIZE } from 'utils/constants';
import { CellType } from '../types/CellType';


const Cell: React.FC<CellType> = ({
  index,
  value,
  xpos,
  ypos,
  flagged,
  mine,
  revealed,
  onCellSelected,
  gameOver,
}) => {

  const StyledCell = styled.div`
    width: ${CELL_SIZE}px;
    height: ${CELL_SIZE}px;
    background-color: beige;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    position: absolute;
    left: ${ypos * CELL_SIZE}px;
    top: ${xpos * CELL_SIZE}px;
    background: ${(index + xpos) % 2 === 0 ? "#A2D049" : "#AAD751"};
  `;

  const selectCell = (x: number, y: number) => {
    console.log('Clicked on', x, y);

    const cell = {
      x,
      y,
      id: null,
    }
    if (onCellSelected) {
      onCellSelected(cell);
    }
  };

  return (
    <StyledCell
      onClick={() => selectCell(xpos, ypos)}
    >
      {/* {mine && (<span>
        💣
      </span>)} */}

      {!mine && revealed && !!value && value}

      {revealed && mine && (<span>
        💣
      </span>)}


      {gameOver && mine && (<span>
        💣
      </span>)}

    </StyledCell>
  )
}

export default Cell
