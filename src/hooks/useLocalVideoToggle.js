import { useCallback, useEffect, useState } from 'react'
import useVideoContext from './useVideoContext'

export default function useLocalVideoToggle() {
  const {
    room,
    localTracks,
    getLocalVideoTrack,
  } = useVideoContext()
  const videoTrack = localTracks.find(track => track.name === 'camera')
  const [localParticipant, setLocalParticipant] = useState()

  useEffect(() => {
    if (room) setLocalParticipant(room.localParticipant)
  }, [room])

  const toggleVideoEnabled = useCallback(async () => {
    if (videoTrack) {
      if (localParticipant) {
        const localTrackPublication = localParticipant.unpublishTrack(videoTrack)
        // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592
        localParticipant.emit('trackUnpublished', localTrackPublication)
      }
      videoTrack.stop()
    } else {
      const track = await getLocalVideoTrack()
      if (localParticipant) {
        localParticipant.publishTrack(track)
      }
    }
  }, [videoTrack, localParticipant, getLocalVideoTrack])

  return [!!videoTrack, toggleVideoEnabled]
}
