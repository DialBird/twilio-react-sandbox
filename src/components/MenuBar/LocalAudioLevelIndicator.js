import React from 'react'
import useVideoContext from '../VideoProvider'
import AudioLevelIndicator from '../AudioLevelIndicator'

const LocalAudioLevelIndicator = () => {
  const { localTracks } = useVideoContext()
  const audioTrack = localTracks.find(track => track.kind === 'audio')

  return <AudioLevelIndicator size={30} audioTrack={audioTrack} />
}

export default LocalAudioLevelIndicator
