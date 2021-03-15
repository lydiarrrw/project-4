import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { getLoggedInUserId } from '../lib/auth'
//import { getLoggedInUserId }  from '../lib/auth'
// import { Link, withRouter } from 'react-router-dom'

export default function AdminDashboard() {



  const [orders, updateOrders] = useState([])
  const [stage, updateStage] = useState('Diamond')
  const [user, updateUser] = useState({})
  const [ready, readyToCollect] = useState({
    ready_to_collect: false
  })
  const [orderReady, updateOrderReady] = useState(false)

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get('/api/order', { headers: { Authorization: `Bearer ${token}` } })
        updateOrders(data)

      } catch (err) {
        console.log(err)
      }
    }
    fetchOrders()

  }, [])

  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateUser(resp.data))
  }, [])

  //console.log(user.is_admin)

  // delete an order
  async function handleDelete(orderid) {
    await axios.put(`/api/order/${orderid}`, ready, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/admin')
  }




  // change order status
  async function handleStatus(orderid) {
    //console.log(orderid)
    readyToCollect({ ready_to_collect: true })
    // updateOrderReady(true)
    if (user.is_admin === true) {
      try {
        await axios.put(`/api/order/${orderid}`, ready, {
          headers: { Authorization: `Bearer ${token}` }
        })
        // console.log(ready)
      } catch (err) {
        console.log(err)
      }
    } else {
      return console.log('nope')
    }
  }


  console.log(orders)
  //console.log(ready)

  return <main className="container">
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

    <div >
      {orders.map(order =>
        <div className="card" key={order.id}>
          <div className="adminOrders">
            <div className="orderStatus">
              <button onClick={(event) => handleDelete(order.id)} className="button is-danger">Delete order</button>
              <div>
                <div className="column pretty p-switch p-fill">
                  <input type="checkbox" onChange={(event) => handleStatus(order.id)} />
                  <div className="state p-success">
                    <label>Order Status</label>
                  </div>
                </div>
                <div className={orderReady ? 'ready' : 'notready'}>Completed</div>
              </div>
            </div>
            <div className="orderTable">
              <div>
                <p className="title is-5">Order No.</p>
                <p className="subtitle is-3">{order.id}</p>
              </div>
              <div>
                <p className="title is-5">Items</p>
                <ul>
                  {order.products.map(product =>
                    <li className="subtitle is-5" key={product.product_name}>{product.product_name}</li>
                  )}
                </ul>
              </div>
              <p className="title is-5">No.</p>
            </div>
            <div className="adminOrders">
              <p className="title is-5">Total Price:</p>
            </div>
          </div>
        </div>
      )}
    </div>

  </main >
}

{/* <div className="column pretty p-switch p-fill">
<input type="checkbox" onChange={(event) => saveArtistToUser(token, act.id)} />
<div className="state p-success">
<label></label>
</div>
</div> */}