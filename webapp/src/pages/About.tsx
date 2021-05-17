import React from 'react'
import styled from 'styled-components';

const StyledCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 20px;
  max-width: 500px;
  text-align: left;
`;
const StyledContainer = styled.div`
  padding: 16px;
`;
const StyledTitle = styled.p`
  color: grey;
`;

const About = () => {
  return (
    <StyledCard>
      <StyledContainer>
        <h2>Francisco Murillo</h2>
        <StyledTitle>Software Engineer</StyledTitle>
        <p>Built with reactJs, Redux, Thunks, Typescript, Styled Components, MaterialUI and Spring Boot Framework.</p>
        <p>fmurillo@gmail.com</p>
        <p>Skype: frazko</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/murillo/" target="blank">https://www.linkedin.com/in/murillo/</a>  </p>
      </StyledContainer>
    </StyledCard>
  )
}

export default About

