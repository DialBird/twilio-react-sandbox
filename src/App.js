import React from 'react'
import { styled } from '@material-ui/core/styles'

import MenuBar from './components/MenuBar'

import useHeight from './hooks/useHeight'

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr'
})

const App = () => {
  const height = useHeight()

  return (
    <Container style={{height}}>
      <MenuBar/>
    </Container>
  )
}

export default App
