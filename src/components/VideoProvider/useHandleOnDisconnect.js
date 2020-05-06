import { useEffect } from 'react'

const useHandleOnDisconnect = (room, onDisconnect) => {
  useEffect(() => {
    room.on('disconnected', onDisconnect)
    return () => {
      room.off('disconnected', onDisconnect)
    }
  })
}

export default useHandleOnDisconnect
