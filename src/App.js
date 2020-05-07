import React from 'react'
import { styled } from '@material-ui/core/styles'

import useHeight from './hooks/useHeight'

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr'
})

const App = () => {
  const height = useHeight()

  return (
    <Container style={{height}}>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Container>
  )
}

export default App
