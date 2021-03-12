import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'

// ! Some starter code for your frontend, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/acts" component={LineUp} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/menu" component={Menu} />
    </Switch>
  </BrowserRouter>
)


// // ! Just a little component to test that you can talk to your flask server, check if it
// // ! works in network tab.
// const TestBackend = () => {
//   useEffect(() => {
//     // ? This is going to try localhost:5000/api
//     axios.get('/api')
//       .then(({ data }) => console.log(data))
//   }, [])

//   return <p>
//     Hello World
//   </p>
// }

export default App