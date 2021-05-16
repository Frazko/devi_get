import React from 'react'
import YouLoseModal from './YouLoseModal';
import styled from 'styled-components';
import YouWinModal from './YouWinModal';

type GameOverType = {
  won: boolean;
  createNewGame: () => void;
  restartGame: () => void;
}

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 115px;
`;

const GameOver: React.FC<GameOverType> = ({ won, createNewGame, restartGame }) => {
  return (
    <Wrapper>
      {won && <YouWinModal createNewGame={createNewGame} restartGame={restartGame} />}
      {!won && <YouLoseModal createNewGame={createNewGame} restartGame={restartGame} />}
    </Wrapper>
  )
}

export default React.memo(GameOver)
