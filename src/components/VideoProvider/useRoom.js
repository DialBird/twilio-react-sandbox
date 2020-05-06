import { useCallback, useEffect, useRef, useState } from 'react'
import EventEmitter from 'events'
import Video from 'twilio-video'

window.TwilioVideo = Video

const useRoom = (localTracks, onError, options) => {
  const [room, setRoom] = useState(new EventEmitter())
  const [isConnecting, setIsConnecting] = useState(false)
  const disconnectHandlerRef = useRef()
  const localTracksRef = useRef()

  useEffect(() => {
    localTracksRef.current = localTracks
  }, [localTracks])

  const connect = useCallback(token => {
    setIsConnecting(true)
    return Video.connect(token, {...options, tracks: []}).then(
      newRoom => {
        setRoom(newRoom)
        newRoom.once('disconnected', () => {
          setTimeout(() => setRoom(new EventEmitter()))
          window.removeEventListener('beforeunload', disconnectHandlerRef.current)
        })

        window.twilioRoom = newRoom

        localTracksRef.current.forEach(track => {
          newRoom.localParticipant.publishTrack(track, { priority: track.kind === 'video' ? 'low' : 'standard' })
        })

        disconnectHandlerRef.current = () => newRoom.disconnect()
        setIsConnecting(false)

        window.addEventListener('beforeunload', disconnectHandlerRef.current)
      },
      error => {
        onError(error)
        setIsConnecting(false)
      })
  }, [options, onError])

  return { room, isConnecting, connect }
}

export default useRoom
