import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'


const NavBar = ({ history }) => {

  // const [menu, updateMenu] = useState(false)


  function handleLogout() {
    localStorage.removeItem('token') // ! This logs you out.
    history.push('/')
  }

  const [menu, showMenu] = useState(false)

  let nav

  if (menu) {
    nav = <div className="dropdown">
      <ul className="menu-list">
        <li><Link className="navitem" to={{ pathname: '/' }}>Home</Link></li>
        <li><Link to={'/acts'}>Acts</Link></li>
        <li><Link to={'/menu'}>Food and drinks</Link></li>
        <li>{!localStorage.getItem('token') && <Link to="/signup" className="button is-danger is-outlined grow">Sign Up</Link>}</li>
        <li>{!localStorage.getItem('token') && <Link to="/login" className="button is-danger is-outlined grow">Login</Link>}</li>
        <li>{localStorage.getItem('token') && <button onClick={handleLogout} className="button is-danger is-outlined grow">Logout</button>}</li>
      </ul>
    </div>
  }



  return <>
    <div className="newnav">
      {nav}
      <a role="button" className="burger" onClick={() => showMenu(!menu)}>NAV</a>
      <Link to={{ pathname: '/' }}>DREAMLAND</Link>
      <Link to={'/profile'}>
        <img alt="go to profile" src="https://www.flaticon.com/svg/vstatic/svg/64/64572.svg?token=exp=1615638463~hmac=8cc4f0ce5e29703c0653fba7cc57a5cd"></img>
      </Link>
    </div>
  </>

}

export default withRouter(NavBar)