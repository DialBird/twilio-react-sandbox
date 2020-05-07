import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'

import ToggleFullScreenButton from './ToggleFullScreenButton'
import LocalAudioLevelIndicator from './LocalAudioLevelIndicator'
import Menu from './Menu'

import { useParams } from 'react-router-dom'
import useVideoContext from '../../hooks/useVideoContext'
import useRoomState from '../../hooks/useRoomState'
import useAppState from '../../state'

const useStyles = makeStyles(theme => {
  return createStyles({
    container: {
      backgroundColor: theme.palette.background.default,
    },
    rightButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      [theme.breakpoints.up('md')]: {
        marginLeft: '2.2em',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    loadingSpinner: {
      marginLeft: '1em',
    },
    displayName: {
      margin: '1.1em 0.6em',
      minWidth: '200px',
      fontWeight: 600,
    },
    joinButton: {
      margin: '1em',
    }
  })
})

const MenuBar = () => {
  const classes = useStyles()
  const { URLRoomName } = useParams()
  const { getToken, isFetching } = useAppState()
  const { isConnecting, connect } = useVideoContext()
  const roomState = useRoomState()

  const [name, setName] = useState('')
  const [roomName, setRoomName] = useState('')

  useEffect(() => {
    if (URLRoomName) {
      setRoomName(URLRoomName)
    }
  }, [URLRoomName])

  const handleNameChange = event => setName(event.target.value)

  const handleRoomNameChange = event => setRoomName(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()
    if (!window.location.origin.includes('twil.io')) {
      window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`))
    }
    getToken(name, roomName).then(token => connect(token))
  }

  return (
    <AppBar className={classes.container} position="static">
      <Toolbar>
        {roomState === 'disconnected' ? (
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="menu-name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={handleNameChange}
              margin="dense"
            />
            <TextField
              id="menu-room"
              label="Room"
              className={classes.textField}
              value={roomName}
              onChange={handleRoomNameChange}
              margin="dense"
            />
            <Button
              className={classes.joinButton}
              type="submit"
              color="primary"
              variant="contained"
              disabled={isConnecting || !name || !roomName || isFetching}
            >
              Join Room
            </Button>
            {(isConnecting || isFetching) && <CircularProgress className={classes.loadingSpinner} />}
          </form>
        ) : (
          <h3>{roomName}</h3>
        )}
        <div className={classes.rightButtonContainer}>
          <LocalAudioLevelIndicator />
          <ToggleFullScreenButton />
          <Menu />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
