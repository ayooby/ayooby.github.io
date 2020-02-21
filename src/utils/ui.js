import styled from 'styled-components'

export const Button = styled.button`
  background: ${props => props.active ? "black" : "white"};
  color: ${props => props.active ? "white" : "black"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
  cursor: pointer;
`;