import React from 'react'
import { useDispatch } from 'react-redux';
import mockData from "./mockData.json";
import Cell from '../components/Cell';

import styled from 'styled-components'
import BoardHeader from '../components/BoardHeader';
import { createGameActionCreator } from '../store/reducers/minesweeperReducer';

const width = 4;
const height = 4;

const Board = () => {

  const dispatch = useDispatch();

  const renderGrid = () => {
    return mockData.board.cells.map((cell, index) => <Cell key={JSON.stringify(cell)} {...cell} index={index} />)
  }

  const StyledGrid = styled.div`
    width: ${width * 40 + 30}px;
    height: ${height * 40 + 30}px;
    background-color: black;
    display: flex;
    justify-content: center;

    position: relative;
    border-radius:10px;
    cursor: pointer;
  `;

  const StyledBoard = styled.div`
    display: flex;
    justify-content: center;
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
  `;

  const handleCreate = () => {
    const gameDetails = {
      rows: 5,
      cols: 5,
      mines: 5,
    }
    dispatch(createGameActionCreator(gameDetails))
  }

  console.log('mock', mockData);
  return (
    <div>
      <BoardHeader />

      <StyledBoard>
        <StyledGrid>
          {renderGrid()}
        </StyledGrid>
      </StyledBoard>

      <StyledButton
        onClick={handleCreate}
      >
        Create Game
      </StyledButton>


    </div>
  )
}

export default Board
