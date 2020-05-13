import { useEffect } from 'react'

const useHandleTrackPublicationFailed = (room, onError) => {
  useEffect(() => {
    if (room && room.localParticipant) {
      room.localParticipant.on('trackPublicationFailed', onError)
      return () => {
        room.localParticipant.off('trackPublicationFailed', onError)
      }
    }
  }, [room, onError])
}

export default useHandleTrackPublicationFailed
