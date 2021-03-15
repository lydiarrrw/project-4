import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import NavBar from './components/navBar'
import Home from './components/Home'
import LoginPage from './components/login'
import Register from './components/register'
import LineUp from './components/LineUp'
import AdminDashboard from './components/adminDashboard'
import Profile from './components/userProfile'



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
      <Route exact path="/lineup" component={LineUp} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/admin" component={AdminDashboard} />
      {/* <Route exact path="/menu" component={Menu} /> */}
    </Switch>
  </BrowserRouter>
)




export default App