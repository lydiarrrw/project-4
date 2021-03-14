import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'
import NavBar from './components/navBar'
import LoginPage from './components/login'
import Register from './components/register'



import 'bulma'
import './styles/style.scss'

// ! Some starter code for your frontend, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Register} />
      <Route exact path="/login" component={LoginPage} />
      {/* <Route exact path="/acts" component={LineUp} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/menu" component={Menu} /> */}
    </Switch>
  </BrowserRouter>
)


const Home = () => {
  const token = localStorage.getItem('token')
  
  console.log(localStorage)
  console.log(localStorage.getItem('is_admin'))
  return <main>
    <div className="hero">
      <h1>Home page</h1>
    </div>

  </main>
}


export default App