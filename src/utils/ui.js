import styled, { createGlobalStyle, css } from "styled-components"
import { rhythm } from "../utils/typography"
import theme from "styled-theming"

const white = "#fff";
const black = "#000";

const buttonStyles = theme("mode", {
  dark: css`
    background: ${white};
    color: ${black};
    background: ${props => (props.active ? "white" : "black")};
    color: ${props => (props.active ? "black" : "white")};
    border: 2px solid white;
    transition: all 200ms ease-in;
  `,
  light: css`
    background: ${black};
    color: ${white};
    background: ${props => (props.active ? "black" : "white")};
    color: ${props => (props.active ? "white" : "black")};
    border: 2px solid black;
    transition: all 200ms ease-in;
  `,
})

const boxStyles = theme("mode", {
  light: css`
    background: ${white};
    color: ${black};
  `,
  dark: css`
    background: ${black};
    color: ${white};
  `,
})

export const Button = styled.button`
  ${buttonStyles}

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;
`

export const GlobalStyle = createGlobalStyle`
  body {
  ${boxStyles}
  }
`

export const Flex = styled.div`
margin-left: auto;
margin-right: auto;
max-width: ${rhythm(24)};
padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`