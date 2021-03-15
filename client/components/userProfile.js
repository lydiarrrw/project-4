import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { titleCase } from '../lib/helpers'


function Profile() {
  const token = localStorage.getItem('token')
  const [userData, updateUserData] = useState({})
  const [artist, updateArtist] = useState({})
  const [modal, showModal] = useState(false)
  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateUserData(resp.data))
  }, [])


  if (!userData.id) {
    return <h1>Loading</h1>
  }

  function clickedArtist(event) {
    const clickedArtist = event.target.innerText
    const filteredArtist = userData.acts.find(act => {
      return act.artist_name === clickedArtist
    })
    return updateArtist(filteredArtist)
  }

  async function saveArtistToUser(actID) {
    try {
      await axios.put(`/api/profile/${actID}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }




  return <main>

    <section className='section'>
      <h2 className='subtitle is-4'>My Personal Lineup</h2>
      {userData.acts.map(act => {
        return <div className="card" key={act.id}>
          <div className="card-content is-flex is-justify-content-space-between">
            <img className="image is-64x64" src={act.image} />
            <h5 className="title is-4 is-clickable" onClick={event => clickedArtist(event, showModal(!modal))}>{act.artist_name}</h5>
            <h6 className="is-size-4">{act.set_time}</h6>
            <h6 className="is-size-4">{act.stage_name}</h6>
            <button className="button is-danger" onClick={() => saveArtistToUser(act.id)}>Remove</button>
          </div>
        </div>
      })}

      <div className={`modal ${modal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{artist.artist_name}</p>
            <button className="delete" aria-label="close" onClick={() => showModal(!modal)}></button>
          </header>
          <section className="modal-card-body">
            <section>
              <img src={artist.image} />
              <section>
                <p>Set time : {artist.set_time}</p>
                <p>Stage name : {artist.stage_name}</p>
              </section>
              <br />
              <p>{artist.bio}</p>
            </section>
          </section>
          <footer className="modal-card-foot">
            <a href={artist.official_website} target="_blank" rel="noreferrer" className="button is-rounded is-success">More artist information</a>
          </footer>
        </div>
      </div>
    </section>

    <section className='section'>
      <h2 className='subtitle is-4'>My Orders</h2>
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
            {`£${order.products.reduce((total, product) => total + product.price, 0)}`}
          </div>
        </div>
      })}
    </section>

  </main>
}

export default Profile