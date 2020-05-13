import React, { createContext, useContext } from 'react'
import { SelectedParticipantProvider } from './useSelectedParticipant'

import useLocalTracks from './useLocalTracks'
import useRoom from './useRoom'
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors'
import useHandleOnDisconnect from './useHandleOnDisconnect'
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed'

const VideoContext = createContext()

export const VideoProvider = ({
  options,
  children,
  onError = () => {},
  onDisconnect = () => {}
}) => {
  const onErrorCallback = error => {
    console.log(`ERROR: ${error.message}`, error)
    onError(error)
  }

  const { localTracks, getLocalVideoTrack } = useLocalTracks()
  const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options)

  useHandleRoomDisconnectionErrors(room, onError)
  useHandleTrackPublicationFailed(room, onError)
  useHandleOnDisconnect(room, onDisconnect)

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError,
        onDisconnect,
        getLocalVideoTrack,
        connect
      }}
    >
      <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
    </VideoContext.Provider>
  )
}

const useVideoContext = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider')
  }
  return context
}

export default useVideoContext
