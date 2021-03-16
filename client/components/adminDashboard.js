import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { getLoggedInUserId } from '../lib/auth'
//import { getLoggedInUserId }  from '../lib/auth'
// import { Link, withRouter } from 'react-router-dom'

export default function AdminDashboard({ history }) {

  const [orders, updateOrders] = useState([])
  const [stage, updateStage] = useState('Diamond')
  const [user, updateUser] = useState({})
  const [ready, readyToCollect] = useState({
    ready_to_collect: true
  })
  const [orderReady, updateOrderReady] = useState(false)
  const [orderTable, updateOrderTable] = useState(false)

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

  // async function refreshOrder() {
  //   try {
  //     const { data } = await axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
  //     updateUserData(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateUser(resp.data))
  }, [])

  {/* Change order status ------------ */ }
  async function handleDelete(orderid) {
    await axios.delete(`/api/order/${orderid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

  }


  // async function handleChange(orderid) {
  //   updateOrderReady(true)
  //   handleStatus(orderid)

  // }

  async function handleOrderDelete(orderid) {
    updateOrderTable(true)
    handleDelete(orderid)

  }


  {/* Change order status ------------ */ }
  async function handleStatus(orderid) {
    // readyToCollect({ ready_to_collect: true })
    updateOrderReady(true)
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

  function filterByStage() {
    return orders.filter(order => {
      return (order.act.stage_name === stage)
    })

  }
  console.log(filterByStage())

  return <main className="container">
    <section className="tabs is-toggle is-fullwidth">
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
    </section>



    {/* Your orders section ------------ */}
    <section className="section">
      <div className="columns is-mobile is-vcentered is-centered">
        <div className="column is-full">
          <h2 className="title is-5">Orders</h2>
        </div>
      </div>
      {/* orders ------------ */}
      {filterByStage().map(order => {
        return <div key={order.id} className="box">
          {/* Order title ------------ */}
          <div className="columns is-mobile is-vcentered is-centered">
            <div className="column is-one-third"><h6 className="title is-5 has-text-centered has-text-link">Order #{order.id}</h6></div>
          </div>
          {/* Order buttons ------------ */}
          <div className="orderStatus">
            <button onClick={(event) => handleOrderDelete(order.id)} className="button is-danger">Order collected?</button>
            <button className="button is-danger" type="button" onClick={(event) => handleStatus(order.id)}>Ready to collect?</button>
            {/* <p className={orderReady ? 'ready' : 'notready'}>Completed</p> */}
          </div>
          {/* Order Details Headers ------------ */}
          <div className="columns is-mobile is-vcentered is-centered">
            <div className="column is-one-third has-text-centered"><strong>Items</strong></div>
            <div className="column is-one-third has-text-centered"><strong>Qty</strong></div>
            <div className="column is-one-third has-text-centered"><strong>Price</strong></div>
          </div>
          {/* Order details ------------ */}
          {order.products.map(product =>
            <div key={product.product_name}>
              <div className="columns is-mobile is-vcentered is-centered">
                <div className="column is-one-third has-text-centered">{product.product_name}</div>
                <div className="column is-one-third has-text-centered">1</div>
                <div className="column is-one-third has-text-centered">{`£${product.price}`}</div>
              </div>
            </div>
          )}
          {/* Grand total ------------ */}
          <div className="columns is-mobile is-vcentered is-centered">
            <div className="column is-one-third has-text-centered has-text-weight-bold">Total</div>
            <div className="column is-one-third has-text-centered"></div>
            <div className="column is-one-third has-text-centered has-text-weight-bold">{`£${order.products.reduce((total, product) => total + product.price, 0)}`}</div>
          </div>
          {/* Collection ------------
          <div className="columns is-mobile is-vcentered is-centered">
            <div className="column is-one-third has-text-centered has-text-weight-bold">Pick Up: </div>
            <div className="column is-two-third has-text-centered has-text-weight-bold">{order.act.stage_name} Stage</div>
          </div> */}
        </div>
      })}

    </section>

  </main >
}

