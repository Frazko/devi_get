import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

import Cell from '../components/Cell';
import BoardHeader from '../components/BoardHeader';
import { getGameInfoActionCreator, restartGameActionCreator, selectCellActionCreator, stopTimerActionCreator, flagCellActionCreator } from '../store/reducers/minesweeperReducer';
import { gameSelector } from '../store/selectors/gameSelectors';
import { CELL_SIZE, CELL_MARGIN } from 'utils/constants';
import { CellType } from '../types/CellType';
import GameOver from '../components/GameOver';

const Wrapper = styled.div`
  position: relative;
`;

const StyledBoard = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const StyledGrid = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 10px;
`;


const Board = () => {
  const {
    id,
    won,
    lost,
    over,
    board,
    loading,
  } = useSelector(gameSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (over) {
      dispatch(stopTimerActionCreator())
    }
  }, [over, dispatch])

  const handleCreate = () => {
    history.push("/");
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

  useEffect(() => {
    const lastSessionId = localStorage.getItem('minesweeper_lastGameId');
    if (lastSessionId != null && !loading) {
      console.log('LOADING STORAGE lastSessionId: ', lastSessionId);
      dispatch(getGameInfoActionCreator(lastSessionId))
    }
  }, [dispatch, loading])

  useEffect(() => {
    localStorage.setItem('minesweeper_lastGameId', id);
  }, [board.cells, id])

  // Could have used hooks to clean this component and make it smaller. no time..
  // I noticed it does not work whe the board is asymmetric :(

console.log('board');
  const renderGrid = () => {
    return board.cells && board.cells.map((cell: CellType, index: number) => <Cell key={index} {...cell} index={index} onCellSelected={handleCellSelected} onCellFlagged={handleCellFlagged} gameOver={over} />)
  }
  return (
    <Wrapper>
      <BoardHeader over={over} />
      {over && <GameOver won={won} createNewGame={handleCreate} restartGame={handleRestart} />}
      <StyledBoard className={over && lost ? 'youLose' : ''}>
        <StyledGrid
          style={{
            width: board.rows * CELL_SIZE + CELL_MARGIN,
            height: board.cols * CELL_SIZE + CELL_MARGIN,
            cursor:over ? 'not-allowed' : 'pointer',
          }}
        >
          {renderGrid()}
        </StyledGrid>
      </StyledBoard>
      <pre>
        Click to Reveal, Right Click to Flag.
      </pre>
    </Wrapper >
  )
}

export default Board
