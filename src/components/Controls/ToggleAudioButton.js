import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import Mic from '@material-ui/icons/Mic'
import MicOff from '@material-ui/icons/MicOff'
import Tooltip from '@material-ui/core/Tooltip'

import useLocalAudioToggle from '../../hooks/useLocalAudioToggle'

const useStyles = makeStyles(theme => {
  return createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
})

const ToggleAudioButton = props => {
  const classes = useStyles()
  const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle()

  return (
    <Tooltip
      title={isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleAudioEnabled} disabled={props.disabled} data-cy-audio-toggle>
        {isAudioEnabled ? <Mic /> : <MicOff />}
      </Fab>
    </Tooltip>
  )
}

export default ToggleAudioButton
