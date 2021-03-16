import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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


  async function refreshProfile() {
    try {
      const { data } = await axios.get('api/profile', { headers: { Authorization: `Bearer ${token}` } })
      updateUserData(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function removeArtist(actID) {
    try {
      await axios.put(`/api/profile/${actID}`, {}, { headers: { Authorization: `Bearer ${token}` } })
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
    showModal(!modal)
    refreshProfile()
  }


  return <main>

    {/* Your Personal Line Up */}
    <section className="section">
      {/* Title Add Artist ------------ */}
      <div className="columns is-mobile is-vcentered is-centered">
        <div className="column is-two-thirds">
          <h2 className="title is-5">Your Personal Lineup</h2>
        </div>
        <div className="column is-one-third">
          <Link to={'/lineup'}><button className="button is-success is-small">Add Artists</button></Link>
        </div>
      </div>
      {/* Lineup------------ */}
      <div className={userData.acts.length > 0 || false ? 'columns is-mobile is-vcentered is-centered box' : 'columns is-mobile is-vcentered is-centered'}>
        <div className="column is-full">
          {/* headers ------------ */}
          {userData.acts.length > 0 ?
            <div className="columns is-mobile is-vcentered is-centered">
              <div className="column is-half"><h6 className="title is-6 has-text-centered">Artist</h6></div>
              <div className="column is-one-quarter"><h6 className="title is-6 has-text-centered">Time</h6></div>
              <div className="column is-one-quarter"><h6 className="title is-6 has-text-centered">Stage</h6></div>
            </div>
            : <div>Click {'"Add Artists"'} to start building your personal lineup.</div>}
          {/* line up list------------ */}
          {userData.acts.map(act => {
            return <div key={act.id} className="columns is-mobile is-vcentered is-centered">
              <div className="column is-one-quarter">
                <figure className="image is-64x64">
                  <img src={act.image} alt={`picture of ${act.artist_name}`} />
                </figure>
              </div>

              <div
                className="column is-one-quarter has-text-centered has-text-link"
                onClick={event => clickedArtist(event, showModal(!modal))}>
                {act.artist_name}</div>
              <div className="column is-one-quarter has-text-centered">{act.set_time}</div>
              <div className="column is-one-quarter has-text-centered">{act.stage_name}</div>
            </div>
          })}
          {/* modal------------ */}
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
                <a href={artist.official_website} target="_blank" rel="noreferrer" className="button is-rounded is-success">More artist info</a>
                <button className="button is-rounded button is-danger" onClick={() => removeArtist(artist.id)}>Remove from  list</button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Your orders section ------------ */}
    <section className="section">
      <div className="columns is-mobile is-vcentered is-centered">
        <div className="column is-full">
          <h2 className="title is-5">Your Orders</h2>
        </div>
      </div>
      {/* orders ------------ */}
      {userData.orders.length > 0 ?
        userData.orders.map(order => {
          return <div key={order.id} className="box">
            {/* Order title ------------ */}
            <div className="columns is-mobile is-vcentered is-centered">
              <div className="column is-one-third"><h6 className="title is-6 has-text-centered has-text-link">Order #{order.id}</h6></div>
              <div className="column is-two-third"><h6 className="title is-6 has-text-centered has-text-link">Status: {order.ready_to_collect ? 'Ready to collect' : 'Processing'}</h6></div>
            </div>
            {/* Order Details Headers ------------ */}
            <div className="columns is-mobile is-vcentered is-centered">
              <div className="column is-one-third has-text-centered">Items</div>
              <div className="column is-one-third has-text-centered">Qty</div>
              <div className="column is-one-third has-text-centered">Price</div>
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
            {/* Collection ------------ */}
            <div className="columns is-mobile is-vcentered is-centered">
              <div className="column is-one-third has-text-centered has-text-weight-bold">Pick Up: </div>
              <div className="column is-two-third has-text-centered has-text-weight-bold">{order.act.stage_name} Stage</div>
            </div>
          </div>
        })
        : <div>Visit the <Link to={'/menu'}>Order Food & Drinks</Link> page to place your first order.</div>
      }
    </section>
  </main >
}

export default Profile