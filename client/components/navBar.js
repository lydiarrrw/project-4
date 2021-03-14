import axios from 'axios'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'


const NavBar = ({ history }) => {

  function handleLogout() {
    localStorage.removeItem('token') // ! This logs you out.
    history.push('/')
  }

  const [menu, showMenu] = useState(false)

  let nav

  if (menu) {
    nav = <div>
      <ul className="menu-list">
        <li>{localStorage.getItem('token') && <Link to="/acts" className="button is-danger is-outlined grow">Acts</Link>}</li>
        {/* <li><Link to={'/acts'}><strong>Acts</strong></Link></li> */}
        <li>{localStorage.getItem('token') && <Link to="/menu" className="button is-danger is-outlined grow">Menu</Link>}</li>
        {/* <li><Link to={'/menu'}><strong>Place<br />Order</strong></Link></li> */}
        <li>{localStorage.getItem('token') && <Link to="/admin" className="button is-danger is-outlined grow">ADMIN</Link>}</li>
        <li>{!localStorage.getItem('token') && <Link to="/signup" className="button is-danger is-outlined grow">Sign Up</Link>}</li>
        <li>{!localStorage.getItem('token') && <Link to="/login" className="button is-danger is-outlined grow">Login</Link>}</li>
        <li>{localStorage.getItem('token') && <button onClick={handleLogout} className="button is-danger is-outlined grow">Logout</button>}</li>
      </ul>
    </div>
  }



  return <>
    <div className="newnav navbar-brand">
      <div>
        <a role="button" onClick={() => showMenu(!menu)}>
          <img src="https://www.flaticon.com/premium-icon/icons/svg/2989/2989870.svg" alt="navigation menu" className="navimg" ></img>
        </a>

      </div>
      <Link to={{ pathname: '/' }}><h1 className="dlheader">Dreamland</h1></Link>
      <Link to={'/profile'} className="profileIcon">
        <img alt="go to profile" src="https://www.flaticon.com/svg/vstatic/svg/64/64572.svg?token=exp=1615638463~hmac=8cc4f0ce5e29703c0653fba7cc57a5cd"></img>
      </Link>
    </div>
    <div>{nav}</div>
  </>


}

export default withRouter(NavBar)