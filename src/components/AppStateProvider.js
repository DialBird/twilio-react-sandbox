import React, { createContext, useContext, useState } from 'react'

const AppStateContext = createContext()

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

  return <AppStateContext.Provider value={{ ...contextValue, getToken }}>{children}</AppStateContext.Provider>
}

const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider')
  }
  return context
}

export default useAppState
