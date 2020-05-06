import React, { createContext } from 'react'
import { SelectedParticipantProvider } from './useSelectedParticipant'

import useLocalTracks from './useLocalTracks'
import useRoom from './useRoom'
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors'
import useHandleOnDisconnect from './useHandleOnDisconnect'
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed'

export const VideoContext = createContext()

const VideoProvider = ({ options, children, onError = () => {}, onDisconnect = () => {}}) => {
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

export default VideoProvider
