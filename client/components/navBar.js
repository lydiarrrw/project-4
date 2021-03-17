import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

const NavBar = ({ history }) => {
  const [menu, showMenu] = useState(false)
  const [user, updateUser] = useState({})
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateUser(resp.data))
  }, [])
  
  //console.log(user.is_admin)


  {/* Refresh buttons on the nav ------------ */ }
  async function refreshNavBar() {
    try {
      const { data } = await axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      updateUser(data)
    } catch (err) {
      console.log(err)
    }
    showMenu(!menu)
  }
 
  // console.log(user.is_admin)


  function handleLogout() {
    localStorage.removeItem('token') // ! This logs you out.
    history.push('/lineup')
    updateUser({})
  }

  function hideNav() {
    showMenu(false)
  }
  
  // console.log(localStorage)

  
  // const loggedIn = getLoggedInUserId()

  let nav

  if (menu) {
    nav = <div>
      <ul className="menu-list">
        <li></li>
        <li>{localStorage.getItem('token') && <p><Link onClick={hideNav} to="/lineup" className="navitem">Acts</Link></p>}</li>      
        <li>{localStorage.getItem('token') && <Link onClick={hideNav} to="/menu" className="navitem">Menu</Link>}</li>
        <li>{(user.is_admin === true) && <Link onClick={hideNav} to="/admin" className="navitem">Admin</Link>}</li>
        <li>{!localStorage.getItem('token') && <Link onClick={hideNav} to="/signup" className="navitem">Sign Up</Link>}</li>
        <li>{!localStorage.getItem('token') && <Link  onClick={hideNav} to="/login" className="navitem">Login</Link>}</li>
        <li>{localStorage.getItem('token') && <a onClick={handleLogout} className="navitem">Logout</a>}</li>
        <li></li>
      </ul>
    </div>
  }



  return <nav className="nav-color">
    <div className="newnav">
      <div>
        <a role="button" onClick={() => refreshNavBar() }>
          <img src="https://i.imgur.com/m4LDivk.png" alt="navigation menu" className="navimg" ></img>
        </a>

      </div>
      <Link to={{ pathname: '/' }}><h1 className="dlheader">Dreamland</h1></Link>
      <Link to={'/profile'} className="profileIcon">
        <img alt="go to profile" className="profilelogo" src="https://i.imgur.com/9kDNNQo.png"></img>
      </Link>
    </div>
    <div>{nav}</div>
  </nav>


}

export default withRouter(NavBar)