import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import CallEnd from '@material-ui/icons/CallEnd'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'

import useVideoContext from '../../hooks/useVideoContext'

const useStyles = makeStyles(theme => {
  return createStyles({
    fab: {
      margin: theme.spacing(1),
    },
  })
})

const EndCallButton = () => {
  const classes = useStyles()
  const { room } = useVideoContext()

  return (
    <Tooltip title={'End Call'} onClick={() => room.disconnect()} placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={classes.fab} color="primary">
        <CallEnd />
      </Fab>
    </Tooltip>
  )
}

export default EndCallButton
