import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledHome = styled.div`
  color: ${props => props.theme.color.active};
  background-color: ${props => props.theme.backgroundColor.active};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};

  h2{
      margin-bottom: 2rem;
  }
`;

const Home = () => {
    return(
        <StyledHome>
            <h2>Welcome to Lambda Eats</h2>
            <Link to="/order">Click here to begin.</Link>
        </StyledHome>
    );
};

export default Home;