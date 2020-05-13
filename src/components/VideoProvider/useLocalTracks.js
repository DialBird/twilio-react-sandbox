import { useCallback, useEffect, useState } from 'react'
import Video from 'twilio-video'

export const useLocalAudioTrack = () => {
  const [track, setTrack] = useState()

  useEffect(() => {
    // CHECK
    Video.createLocalAudioTrack().then(setTrack)
  }, [])

  useEffect(() => {
    const handleStopped = () => setTrack(undefined)
    if (track) {
      track.on('stopped', handleStopped)
      return () => {
        track.off('stopped', handleStopped)
      }
    }
  }, [track])

  return track
}

export const useLocalVideoTrack = () => {
  const [track, setTrack] = useState()

  const getLocalVideoTrack = useCallback(() => {
    Video.createLocalVideoTrack({
      frameRate: 24,
      height: 720,
      width: 1280,
      name: 'camera',
    }).then(newTrack => {
      setTrack(newTrack)
      return newTrack
    })
  }, [])

  useEffect(() => {
    // We get a new local video track when the app loads
    getLocalVideoTrack()
  }, [getLocalVideoTrack])

  useEffect(() => {
    const handleStopped = () => setTrack(undefined)
    if (track) {
      track.on('stopped', handleStopped)
      return () => {
        track.off('stopped', handleStopped)
      }
    }
  }, [track])

  return [track, getLocalVideoTrack]
}

const useLocalTracks = () => {
  const audioTrack = useLocalAudioTrack()
  const [videoTrack, getLocalVideoTrack] = useLocalVideoTrack()

  const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined)

  return { localTracks, getLocalVideoTrack }
}

export default useLocalTracks
