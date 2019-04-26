import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { space, color, fontSize, fontWeight, lineHeight } from 'styled-system'
import Profile from './pages/Profile'
import SendMessage from './pages/SendMessage'
import LIFFWindow from './pages/LIFFWindow'
import { Header } from './pages/components'
import { theme } from './pages/styles'

const Style = createGlobalStyle`
  * { box-sizing: border-box; }
  body{ margin:0; }
`

const Root = styled.div`
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  text-align: center;
`

const Text = styled.div`
  ${space}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}
  ${color}
`
Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes
}

const Heading = Text

Heading.defaultProps = {
  fontSize: [4, 5, 6],
  lineHeight: 1.5,
  bg: 'green',
  color: 'white',
  m: 0
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Root>
          <Style />
          <Heading as="h2">React LIFF Boilerplate</Heading>
          <Header />
          <Router>
            <div>
              <Route exact path="/" component={Profile} />
              <Route path="/message" component={SendMessage} />
              <Route path="/window" component={LIFFWindow} />
            </div>
          </Router>
        </Root>
      </ThemeProvider>
    )
  }
}

export default App
