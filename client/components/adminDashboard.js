import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import { getLoggedInUserId }  from '../lib/auth'
// import { Link, withRouter } from 'react-router-dom'

export default function AdminDashboard() {
  const [orders, updateOrders] = useState([])
  const [stage, updateStage] = useState('Diamond')
  const [acts, updateActs] = useState([])


  //const loggedIn = getLoggedInUserId()
  //console.log('hello' + loggedIn)
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get('/api/order', { headers: { Authorization: `Bearer ${token}` } })
        updateOrders(data)
        updateActs(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchOrders()

  }, [])
  console.log(token)
  
// delete an order
// change order status

  console.log(orders)

  return <main>
    <div className="tabs is-toggle is-fullwidth">
      <ul onClick={(event) => updateStage(event.target.innerText)}>
        <li className="" >
          <a>
            <span className="title is-4">Diamond</span>
          </a>
        </li>
        <li>
          <a>
            <span className="title is-4">Lion Ring</span>
          </a>
        </li>
        <li >
          <a>
            <span className="title is-4">Fairground</span>
          </a>
        </li>
      </ul>
    </div>

    <div>
      {orders.map(order =>
        <div className="card" key={order.id}>
          <p>Delete order</p>
          <p>Tap for order ready</p>
          <h5><strong>Order No. </strong>{order.id}</h5>
          <h6><strong>Products</strong></h6>{order.products.map(product =>
            <p key={product.product_name}>{product.product_name}</p>
            
          )}
          <p>Quantity:</p>
          <p>Total Price:</p>
        </div>
      )}
    </div>
  </main >
}