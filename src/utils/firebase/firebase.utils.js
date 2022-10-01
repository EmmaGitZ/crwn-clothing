import { initializeApp } from 'firebase/app'
// set up the authentication
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAljbCw2pHW09L91lRcYSsLVpX9FVD9x0Q',
  authDomain: 'crwn-clothing-db-ba4d0.firebaseapp.com',
  projectId: 'crwn-clothing-db-ba4d0',
  storageBucket: 'crwn-clothing-db-ba4d0.appspot.com',
  messagingSenderId: '821584748117',
  appId: '1:821584748117:web:56cf7448deb2fc75eebedc',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
// all of the CRUD is going to happen using this firebase app instance

// it means everytime someone select auth provider, we always want them to select an account
const googleProvider = new GoogleAuthProvider()
// it's a class that we get from  firebase authentication and it's connected to google auth itself

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

// it's a singleton, should always be the same one for every application
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = { displayName: 'mike' }
) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  //data
  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot)
  // console.log(userSnapshot.exists())
  // if there is a relevant place in the database for this data, give it back to me, if not, create one for me

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    // in this way we know when the user is signing in
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
  // if user data does not exist
  // create / set the document with the data from userAuth in my collection

  // if user data exists
  // return userDocRef
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
// interface layer
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
