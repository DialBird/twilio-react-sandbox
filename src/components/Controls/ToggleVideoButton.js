import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Videocam from '@material-ui/icons/Videocam'
import VideocamOff from '@material-ui/icons/VideocamOff'

import useLocalVideoToggle from '../../hooks/useLocalVideoToggle'

const useStyles = makeStyles(theme => {
  return createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
})

const ToggleVideoButton = props => {
  const classes = useStyles()
  const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle()

  return (
    <Tooltip
      title={isVideoEnabled ? 'Mute Video' : 'Unmute Video'}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleVideoEnabled} disabled={props.disabled}>
        {isVideoEnabled ? <Videocam /> : <VideocamOff />}
      </Fab>
    </Tooltip>
  )
}

export default ToggleVideoButton
