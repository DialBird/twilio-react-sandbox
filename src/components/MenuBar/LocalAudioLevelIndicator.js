import React from 'react'
import useVideoContext from '../../hooks/useVideoContext'
import AudioLevelIndicator from '../AudioLevelIndicator'

const LocalAudioLevelIndicator = () => {
  const { localTracks } = useVideoContext()
  const audioTrack = localTracks.find(track => track.kind === 'audio')

  return <AudioLevelIndicator size={30} audioTrack={audioTrack} />
}

export default LocalAudioLevelIndicator
