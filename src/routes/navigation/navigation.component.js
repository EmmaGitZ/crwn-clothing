import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

// import it as a react component
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../context/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'

import './navigation.styles.scss'
// top level component
const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  // const signOutHandler = async () => {
  //   await signOutUser()
  //   setCurrentUser(null)
  // }
  // useContext as a hook tells this component whenever a value inside context updates, rerender me
  // console.log(currentUser)
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"></CrwnLogo>
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet></Outlet>
    </Fragment>
  )
}

export default Navigation
