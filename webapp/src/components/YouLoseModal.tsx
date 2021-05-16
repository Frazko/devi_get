import React from 'react'
import logo from '../assets/bomb.gif'
import styled from 'styled-components';

type GameOverModalType = {
  createNewGame: () => void;
  restartGame: () => void;
}

const Wrapper = styled.div`
  position: relative;
  left: -50%;

  background-color: lightseagreen;
  border: 0.5px solid gray;
  padding: 15px 15px;
  border-radius: 10px;
  display: flex;
  flex-direction:column;
  justify-content:center;
`;
const StyledImage = styled.img`
  border-radius: 15px;
  margin-bottom: 20px;
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
  margin: 10px auto;
`;


const YouLoseModal: React.FC<GameOverModalType> = ({createNewGame, restartGame}) => {
  return (
    <Wrapper className="gameOverModal">
      <StyledImage src={logo} alt="dead" />
      <div>
        You Lose!

        <StyledButton
          onClick={createNewGame}
        >
          Create Game
        </StyledButton>

        <StyledButton
          onClick={restartGame}
        >
          Restart Game
        </StyledButton>
      </div>
    </Wrapper>
  )
}

export default YouLoseModal
