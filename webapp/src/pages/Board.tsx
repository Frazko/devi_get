import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Cell from '../components/Cell';

import styled from 'styled-components'
import BoardHeader from '../components/BoardHeader';
import { createGameActionCreator, getGameInfoActionCreator, restartGameActionCreator, selectCellActionCreator, stopTimerActionCreator, flagCellActionCreator } from '../store/reducers/minesweeperReducer';
import { gameSelector } from '../store/selectors/gameSelectors';
import { CELL_SIZE, CELL_MARGIN } from 'utils/constants';
import { CellType } from '../types/CellType';
import GameOver from '../components/GameOver';

const Wrapper = styled.div`
  position: relative;
`;

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
  } = useSelector(gameSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (over) {
      dispatch(stopTimerActionCreator())
    }
  }, [over])

  const StyledGrid = styled.div`
    width: ${board.rows * CELL_SIZE + CELL_MARGIN}px;
    height: ${board.cols * CELL_SIZE + CELL_MARGIN}px;
    background-color: black;
    display: flex;
    justify-content: center;
    position: relative;
    border-radius:10px;
    cursor: ${over ? 'not-allowed' : 'pointer'};
  `;

  const handleCreate = () => {
    // redirect to home
    history.push("/home");
    // const gameDetails = {
    //   rows: 5,
    //   cols: 5,
    //   mines: 5,
    // }
    // dispatch(createGameActionCreator(gameDetails))
  }

  const handleGetGame = () => {
    dispatch(getGameInfoActionCreator('60a15b26a219d510eef3eaa1'))
  }

  const handleRestart = () => {
    dispatch(restartGameActionCreator(id))
  }

  const handleCellSelected = (selectedCell: any) => {
    if (over) return;
    selectedCell.id = id;
    dispatch(selectCellActionCreator(selectedCell))
  }

  const handleCellFlagged = (selectedCell: any) => {
    if (over) return;
    selectedCell.id = id;
    dispatch(flagCellActionCreator(selectedCell))
  }

  const renderGrid = () => {
    return board.cells && board.cells.map((cell: CellType, index: number) => <Cell key={index} {...cell} index={index} onCellSelected={handleCellSelected} onCellFlagged={handleCellFlagged} gameOver={over} />)
  }

  return (
    <Wrapper>
      <BoardHeader />
      {over && <GameOver won={won} createNewGame={handleCreate} restartGame={handleRestart} />}
      <StyledBoard className={over && lost ? 'youLose' : ''}>
        <StyledGrid>
          {renderGrid()}
        </StyledGrid>
      </StyledBoard>

      <StyledActions>
        <StyledButton
          onClick={handleGetGame}
        >
          Pull Game by ID
        </StyledButton>
      </StyledActions>

    </Wrapper >
  )
}

export default Board
