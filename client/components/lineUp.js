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
    <img className="stages is-fullwidth" src={stageImage} />
    <div className="columns">
      <div className="column">
        <div className="card" >
          <div className="card-content is-flex is-justify-content-space-between column">
            <div className="column title is-4">Artist</div>
            <div className="column title is-4">Set Time</div>
            <div className="column title is-4">Add to your lineup</div>
          </div>
        </div>
        {filterByStage().map(act => {
          return <div className="card" key={act.id}>
            <div className="card-content is-flex is-justify-content-space-between column" key={act.id}>
              <img className="image is-64x64" src={act.image} />
              <div className="column">
                <h5 className="title is-4 is-clickable" onClick={() => clickedArtist(event, showModal(!modal))}>{act.artist_name}</h5>
              </div>
              <div className="column">
                <h6 className="is-size-4">{act.set_time}</h6>
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
          <a href={artist.official_website} target="_blank" className="button is-rounded is-success">More artist information</a>
        </footer>
      </div>
    </div>
  </main>
}