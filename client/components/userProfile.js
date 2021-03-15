import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { titleCase } from '../lib/helpers'


function Profile() {
  const token = localStorage.getItem('token')
  const [userData, updateUserData] = useState({})

  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateUserData(resp.data))
  }, [])

  if (!userData.id) {
    return <h1>Loading</h1>
  }

  return <main>
    <section className='section'>

      <h1 className='title'>{`${titleCase(userData.username)}'s Dreamland`}</h1>

      <section className='section'>
        <h2 className='subtitle is-3'>My Personal Lineup </h2>
        {userData.acts.map(act => {
          return <div key={act.id}>
            {act.set_time}, {act.artist_name}, {act.stage_name}
          </div>
        })}
      </section>

      <section className='section'>
        <h2 className='subtitle is-3'>My Orders</h2>
        {userData.orders.map(order => {
          return <div key={order.id}>
            <h3 className='subtitle is-5'>Collection Time: {order.act.set_time}</h3>
            <h4 className='subtitle is-5'>Stage: {order.act.stage_name}</h4>
            <h4 className='subtitle is-5'>Status: {order.ready_to_collect ? 'Ready to collect' : 'In progress'}</h4>
            <ul>
              <label>Order Details</label>
              {order.products.map(product =>
                <li key={product.product_name}>{product.product_name}: {`£${product.price}`}</li>
              )}
            </ul>
            <div>
              <label>Order Total: </label>
              {`£${order.products.reduce((total, product) => total + product.price,0)}`}
            </div>
          </div>
        })}
      </section>

    </section>
  </main>
}

export default Profile