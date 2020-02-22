import React, { useState } from "react"
import { Link } from "gatsby"
import { ThemeProvider } from "styled-components"

import { Button, Flex } from "../utils/ui"
import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  )

  const handleTheme = () => {
    const newTheme = (theme === "dark") ? "light" : "dark"
    setTheme(newTheme)
    window.localStorage.setItem("theme", newTheme)
  }

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <Flex>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          <Button onClick={handleTheme}>Switch Theme</Button>
        </footer>
      </Flex>
    </ThemeProvider>
  )
}

export default Layout
