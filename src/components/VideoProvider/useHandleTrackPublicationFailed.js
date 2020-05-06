import { useEffect } from 'react'

const useHandleTrackPublicationFailed = (room, onError) => {
  const { localParticipant } = room
  useEffect(() => {
    if (localParticipant) {
      localParticipant.on('trackPublicationFailed', onError)
      return () => {
        localParticipant.off('trackPublicationFailed', onError)
      }
    }
  }, [localParticipant, onError])
}

export default useHandleTrackPublicationFailed
