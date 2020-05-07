import React from 'react'
import { styled } from '@material-ui/core/styles'

import Controls from './components/Controls'
import MenuBar from './components/MenuBar'
import ReconnectingNotification from './components/ReconnectingNotification'

import useHeight from './hooks/useHeight'

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr'
})

const Main = styled('main')({
  overflow: 'hidden'
})

const App = () => {
  const height = useHeight()

  return (
    <Container style={{height}}>
      <MenuBar/>
      <Main>
        <Controls/>
      </Main>
      <ReconnectingNotification/>
    </Container>
  )
}

export default App
