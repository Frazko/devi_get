import React from 'react'
import styled from 'styled-components'
import { CELL_SIZE } from 'utils/constants';
import { CellType } from '../types/CellType';


const Cell: React.FC<CellType> = ({
  index,
  value,
  xpos:x,
  ypos:y,
  flagged,
  mine,
  revealed,
  onCellSelected,
  onCellFlagged,
  gameOver,
}) => {

  const untouchedPattern = (x: number, y: number) => {
    if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
      return "#a2d249";
    } else {
      return "#aad751";
    }
  };
  const revealedPattern = (x: number, y: number) => {
    if ((x % 2 === 0 && y % 2 !== 0) || (x % 2 !== 0 && y % 2 === 0)) {
      return "#d7b899";
    } else {
      return "#e5c29f";
    }
  };

  const StyledCell = styled.div`
    width: ${CELL_SIZE}px;
    height: ${CELL_SIZE}px;
    background-color: beige;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    position: absolute;
    left: ${y * CELL_SIZE}px;
    top: ${x * CELL_SIZE}px;
    background: ${ revealed || (mine && gameOver) ? revealedPattern(x, y) : untouchedPattern(x, y)};
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

  const flagCell = (e: any, x: number, y: number) => {
    e.preventDefault();
    console.log('Flagged on', x, y);

    const cell = {
      x,
      y,
      id: null,
    }
    if (onCellFlagged) {
      onCellFlagged(cell);
    }
  };

  return (
    <StyledCell
      onClick={() => selectCell(x, y)}
      onContextMenu={(e) => flagCell(e, x, y)}
    >
      {!mine && revealed && !!value && value}

      {revealed && mine && (<span>
        💣
      </span>)}

      {flagged && (<span>
        🚩
      </span>)}

      {gameOver && !revealed && mine && (<span>
        💣
      </span>)}

    </StyledCell>
  )
}

export default Cell
