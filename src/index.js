import React from 'react'
import ReactDOM from 'react-dom'

import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from './App'
import useAppState, { AppStateProvider } from './components/AppStateProvider'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import theme from './theme'
import { VideoProvider } from './components/VideoProvider'
import ErrorDialog from './components/ErrorDialog'
import * as serviceWorker from './serviceWorker'

const connectionOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
}

const VideoApp = () => {
  const { error, setError } = useAppState()

  return (
    <VideoProvider options={connectionOptions}>
      <ErrorDialog dismissError={() => setError(null)} error={error}/>
      <App/>
    </VideoProvider>
  )
}

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AppStateProvider>
        <Switch>
          <Route exact path='/'>
            <VideoApp/>
          </Route>
          <Route path='/room/:URLRoomName'>
            <VideoApp/>
          </Route>
          <Redirect to='/'/>
        </Switch>
      </AppStateProvider>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
