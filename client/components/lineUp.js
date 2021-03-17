import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LineUp() {
  const [acts, updateActs] = useState([])
  const [stage, updateStage] = useState('Diamond')
  const [modal, showModal] = useState(false)
  const [artist, updateArtist] = useState({})
  const token = localStorage.getItem('token')
  // const [toggle, setToggle] = useState(false)
  const [stageImage, updateStageImage] = useState('https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')

  async function getLineUp() {
    try {
      const { data } = await axios.get('/api/acts')
      updateActs(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getLineUp()
  }, [])

  function filterByStage() {
    return acts.filter(act => {
      return (act.stage_name === stage)
    })
  }


  console.log(stage)
  function clickedArtist(event) {
    const clickedArtist = event.target.innerText
    const filteredArtist = acts.find(act => {
      return act.artist_name === clickedArtist
    })
    return updateArtist(filteredArtist)
  }

  async function saveArtistToUser(token, actID) {
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
    <div className="tabs is-toggle is-fullwidth mb-2 menuOptions">
      <ul onClick={(event) => updateStage(event.target.innerText)}>
        <li className={(stage === 'Diamond') ? 'is-warning is-active' : 'notactive'}  >
          <a>
            <span className="is-mobile-size-5 has-text-weight-bold">Diamond</span>
          </a>
        </li>
        <li className={(stage === 'Lion Ring') ? 'is-active' : 'notactive'} >
          <a>
            <span className="is-mobile-size-5 has-text-weight-bold">Lion Ring</span>
          </a>
        </li>
        <li className={(stage === 'Fairground') ? 'is-active' : 'notactive'}>
          <a>
            <span className="is-mobile-size-5 has-text-weight-bold">Fairground</span>
          </a>
        </li>
      </ul>
    </div>
    <section
      className="hero is-halfheight"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${stageImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
      <div className="hero-body">
        <div className="">
          <p className="title has-text-white">Line Up</p>
          <p className="subtitle has-text-white">Explore all artists</p>
        </div>
      </div>
    </section>
    <div className="columns">
      <div className="column">
        <div className="card" >
          <div className="card-content is-flex is-justify-content-space-between column">
            <div className="column is-mobile-size-5 has-text-weight-bold">Artist</div>
            <div className="column is-mobile-size-5 has-text-weight-bold">Set Time</div>
            <div className="column is-mobile-size-5 has-text-weight-bold">Add to your lineup</div>
          </div>
        </div>
        {filterByStage().map(act => {
          return <div className="card" key={act.id}>
            <div className="card-content is-flex is-justify-content-space-between column" key={act.id}>
              <img className="image is-64x64" src={act.image} />
              <div className="column">
                <h5 className="is-mobile-size-4 has-text-weight-bold" onClick={() => clickedArtist(event, showModal(!modal))}>{act.artist_name}</h5>
              </div>
              <div className="column">
                <h6 className="is-mobile-size-4">{act.set_time}</h6>
              </div>
              <div className="column pretty p-switch p-fill">
                <input type="checkbox" onChange={(event) => saveArtistToUser(token, act.id)} />
                <div className="state p-success">
                  <label></label>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
    {/* Artist info */}
    <div className={`modal ${modal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <h4 className="modal-card-title has-text-centered has-text-weight-bold">{artist.artist_name}</h4>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)}></button>
        </header>
        <section className="modal-card-body">
          <section>
            <img className="" src={artist.image} />
            <section>
              <p className="has-text-weight-semibold">Set time : {artist.set_time}</p>
              <br />
              <p className="has-text-weight-semibold">Stage name : {artist.stage_name}</p>
            </section>
            <br />
            <p>{artist.bio}</p>
          </section>
        </section>
        <footer className="modal-card-foot">
          <a id="modalButton" href={artist.official_website} target="_blank" className="button is-rounded has-text-light">More information</a>
        </footer>
      </div>
    </div>
  </main>
}