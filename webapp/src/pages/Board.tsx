import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Cell from '../components/Cell';

import styled from 'styled-components'
import BoardHeader from '../components/BoardHeader';
import { createGameActionCreator, getGameInfoActionCreator, restartGameActionCreator, selectCellActionCreator } from '../store/reducers/minesweeperReducer';
import { cellsSelector } from '../store/selectors/gameSelectors';
import { CELL_SIZE, CELL_MARGIN } from 'utils/constants';
import { CellType } from '../types/CellType';

const StyledActions = styled.div`
display: flex;
justify-content: center;
`;

const StyledBoard = styled.div`
display: flex;
justify-content: center;
margin: 20px;
`;

const StyledButton = styled.div`
width: 150px;
border-radius: 6px;
border: 0.5px solid gray;
padding: 4px;
cursor: pointer;
display: flex;
justify-content: center;
background-color: lightblue;
margin: 10px;
`;

const Board = () => {

  const {
    id,
    won,
    lost,
    over,
    board,
  } = useSelector(cellsSelector);

  const dispatch = useDispatch();


  const StyledGrid = styled.div`
    width: ${board.rows * CELL_SIZE + CELL_MARGIN}px;
    height: ${board.cols * CELL_SIZE + CELL_MARGIN}px;
    background-color: black;
    display: flex;
    justify-content: center;
    position: relative;
    border-radius:10px;
    cursor: pointer;
  `;

  const handleCreate = () => {
    const gameDetails = {
      rows: 5,
      cols: 5,
      mines: 5,
    }
    dispatch(createGameActionCreator(gameDetails))
  }

  const handleGetGame = () => {
    dispatch(getGameInfoActionCreator('60a15b26a219d510eef3eaa1'))
  }

  const handleRestart = () => {
    dispatch(restartGameActionCreator(id))
  }

  const handleCellSelected = (selectedCell: any) => {
    selectedCell.id = id;
    dispatch(selectCellActionCreator(selectedCell))
  }

  const renderGrid = () => {
    return board.cells && board.cells.map((cell: CellType, index: number) => <Cell key={index} {...cell} index={index} onCellSelected={handleCellSelected} gameOver={over}/>)
  }

  return (
    <div>
      <BoardHeader />

      {lost && <div>
        perdistess
      </div>}

      {won && <div>
        ganastess
      </div>}

      {over && <div>
        ya se petatio esto
      </div>}

      <StyledBoard>
        <StyledGrid>
          {renderGrid()}
        </StyledGrid>
      </StyledBoard>
      
     <StyledActions>
      <StyledButton
        onClick={handleCreate}
      >
        Create Game
      </StyledButton> 

      <StyledButton
        onClick={handleGetGame}
      >
        Pull Game by ID
      </StyledButton>


      <StyledButton
        onClick={handleRestart}
      >
        Restart Game
      </StyledButton>
      </StyledActions>

    </div>
  )
}

export default Board
