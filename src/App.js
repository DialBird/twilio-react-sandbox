import React from 'react'
import { styled } from '@material-ui/core/styles'

import Controls from './components/Controls'
import LocalVideoPreview from './components/LocalVideoPreview'
// import Room from './components/Room'
import MenuBar from './components/MenuBar'
import ReconnectingNotification from './components/ReconnectingNotification'

import useHeight from './hooks/useHeight'
import useRoomState from './hooks/useRoomState'

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr'
})

const Main = styled('main')({
  overflow: 'hidden'
})

const App = () => {
  const roomState = useRoomState()
  const height = useHeight()

  return (
    <Container style={{height}}>
      <MenuBar/>
      <Main>
        <LocalVideoPreview/>
        <Controls/>
      </Main>
      <ReconnectingNotification/>
    </Container>
  )
}

export default App
