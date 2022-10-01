import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'

// import it as a react component
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'
// top level component
const Navigation = () => (
  <Fragment>
    <div className="navigation">
      <Link className="logo-container" to="/">
        <CrwnLogo className="logo"></CrwnLogo>
      </Link>

      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          SHOP
        </Link>
        <Link className="nav-link" to="/auth">
          SIGN IN
        </Link>
      </div>
    </div>
    <Outlet></Outlet>
  </Fragment>
)

export default Navigation
