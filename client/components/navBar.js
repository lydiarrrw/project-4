import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'


const NavBar = ({ history }) => {

  const [menu, updateMenu] = useState(false)

  function handleLogout() {
    localStorage.removeItem('token') // ! This logs you out.
    history.push('/')


  }


  return <nav className="navbar">

    <div className="navbar-brand">

      <a onClick={() => updateMenu(!menu)} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className={`navbar-menu ${menu ? 'is-active' : ''} is-spaced px-3`}>
      <Link to={'/'}>
        <strong>Home</strong>
      </Link>
      <br />
      <Link to={'/acts'}>
        <strong>Acts</strong>
      </Link>
 
      <div className="buttons">
        {!localStorage.getItem('token') && <Link to="/signup" className="button is-danger is-outlined grow">
          <strong>Sign Up</strong>
        </Link>}
        {!localStorage.getItem('token') && <Link to="/login" className="button is-danger is-outlined grow">
          <strong>Login</strong>
        </Link>}
        {localStorage.getItem('token') && <button onClick={handleLogout} className="button is-danger is-outlined grow">
          <strong>Logout</strong>
        </button>}
      </div>


    </div>
    <Link to="/">
      DREAMLAND
    </Link>
    <Link to={'/profile'}>
      <img alt="go to profile" src="https://www.flaticon.com/svg/vstatic/svg/64/64572.svg?token=exp=1615638463~hmac=8cc4f0ce5e29703c0653fba7cc57a5cd"></img>
    </Link>



  </nav>
}

export default withRouter(NavBar)