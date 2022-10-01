import { createContext, useState, useEffect } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  signOutUser,
} from '../utils/firebase/firebase.utils'
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

// this provider is allowing any of its child component to access the values inside of its usestate
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }
  // we set up the actual storage first before we started actually setting up the separate call for that data
  // signOutUser()

  useEffect(() => {
    // the moment this listener mounts, it will check the authentication state automatically when you initialize the listener
    // any future runs of this callback is tied directly to the actual authstate changing

    // it runs everytime auth state changes
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
