import React, { createContext, useContext, useState, useEffect } from 'react'

export const SelectedParticipantContext = createContext()

const useSelectedParticipant = () => {
  const [selectedParticipant, setSelectedParticipant] = useContext(SelectedParticipantContext)
  return [selectedParticipant, setSelectedParticipant]
}

export const SelectedParticipantProvider = ({ room, children }) => {
  const [selectedParticipant, _setSelectedParticipant] = useState()
  const setSelectedParticipant = (participant) => {
    _setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : participant))
  }

  useEffect(() => {
    const onDisconnect = () => _setSelectedParticipant(null)
    room.on('disconnected', onDisconnect)
    return () => {
      room.off('disconnected', onDisconnect)
    }
  }, [room])

  return (
    <SelectedParticipantContext.Provider value={[selectedParticipant, setSelectedParticipant]}>
      {children}
    </SelectedParticipantContext.Provider>
  )
}

export default useSelectedParticipant
