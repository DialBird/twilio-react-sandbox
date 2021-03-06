import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import EndCallButton from './EndCallButton'
import ToggleAudioButton from './ToggleAudioButton'
import ToggleVideoButton from './ToggleVideoButton'
import ToggleScreenShareButton from './ToogleScreenShareButton'

import useIsUserActive from './useIsUserActive'
import useRoomState from '../../hooks/useRoomState'

const useStyles = makeStyles(theme => {
  return createStyles({
    container: {
      display: 'flex',
      position: 'absolute',
      right: '50%',
      transform: 'translate(50%, 30px)',
      bottom: '50px',
      zIndex: 1,
      transition: 'opacity 1.2s, transform 1.2s, visibility 0s 1.2s',
      opacity: 0,
      visibility: 'hidden',
      maxWidth: 'min-content',
      '&.showControls, &:hover': {
        transition: 'opacity 0.6s, transform 0.6s, visibility 0s',
        opacity: 1,
        visibility: 'visible',
        transform: 'translate(50%, 0px)',
      },
      [theme.breakpoints.down('xs')]: {
        bottom: `${theme.sidebarMobileHeight + 3}px`,
      },
    },
  })
})

export default function Controls() {
  const classes = useStyles()
  const roomState = useRoomState()
  const isReconnecting = roomState === 'reconnecting'
  const isUserActive = useIsUserActive()
  const showControls = isUserActive || roomState === 'disconnected'

  return (
    <div className={clsx(classes.container, { showControls })}>
      <ToggleAudioButton disabled={isReconnecting} />
      <ToggleVideoButton disabled={isReconnecting} />
      {roomState !== 'disconnected' && (
        <>
          <ToggleScreenShareButton disabled={isReconnecting} />
          <EndCallButton />
        </>
      )}
    </div>
  )
}
