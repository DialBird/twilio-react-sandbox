import React, { createContext, useContext, useState } from 'react'

export const StateContext = createContext()

export const AppStateProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const contextValue = {
    error,
    setError,
    isFetching,
  }

  const getToken = (identity, roomName) => {
    setIsFetching(true)
    const headers = new window.Headers()
    const endpoint = '/token'
    const params = new window.URLSearchParams({ identity, roomName })
    return fetch(`${endpoint}?${params}`, { headers }).then(res => res.text())
      .then(res => {
        setIsFetching(false)
        return res
      })
      .catch(err => {
        setError(err)
        setIsFetching(false)
        return Promise.reject(err)
      })
  }

  return <StateContext.Provider value={{ ...contextValue, getToken }}>{children}</StateContext.Provider>
}

const useAppState = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider')
  }
  return context
}

export default useAppState
