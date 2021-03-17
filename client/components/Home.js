import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Reactions from './reactions'

function Home() {
  const [acts, updateActs] = useState([])
  const [time, updateTime] = useState(new Date())
  const [actClicked, updateActClicked] = useState({})
  const [modal, showModal] = useState(false)


  // Fetch the acts data from our API
  useEffect(() => {
    axios.get('api/acts')
      .then(resp => updateActs(resp.data))
  }, [])


  // Guard ensuring the data has arrived
  if (acts.length === 0) {
    return <h1>Loading</h1>
  }

  // Getting current time in state every second
  setTimeout(() => {
    updateTime(new Date())
  }, 1000)

  // For testing purpose
  // const now = new Date()
  // const time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0)

  
  // Formatting the acts set time in time format for use in founctions below
  // And for render on the page
  const mappedActs = acts.map(act => {
    const newAct = {
      'artist_name': act.artist_name,
      'set_time': new Date(time.getFullYear(), time.getMonth(), time.getDate(), act.set_time.substring(0, 2), act.set_time.substring(3, 4)),
      'stage_name': act.stage_name,
      'image': act.image,
      'id': act.id,
      'reactions': act.reactions
    }
    return newAct
  })


  function getLiveArtists() {
    const filteredActs = mappedActs.filter(act => act.set_time <= time)
    const liveArtists = []
    for (let index = filteredActs.length - 3; index < filteredActs.length; index++) {
      liveArtists.push(filteredActs[index])
    }
    return liveArtists
  }

  function getNextArtists() {
    const filteredActs = mappedActs.filter(act => act.set_time > time)
    const nextArtists = []
    for (let index = 0; index < 3; index++) {
      nextArtists.push(filteredActs[index])
    }
    return nextArtists
  }

  function findClickedAct(actID) {
    const act = acts.find(act => act.id === actID)
    updateActClicked(act)
  }



  return <main className="home-back">
    {/* reaction functionality  */}

    {/* Title */}
    {/* <section className="hero is-medium">
      <div className="hero-body">
        <h1 className="title has-text-centered is-4">Welcome To Dreamland</h1>
      </div>
    </section> */}
    {/* View Line Up */}
    <section className="hero is-medium" id="hero-home">
      <div className="hero-body">
        <Link to="/lineup">
          <p className="title is-5 has-text-white">View Line Up</p>
        </Link>
      </div>
    </section>
    {/* Food & Drinks */}
    <section className="hero is-medium" id="food-drinks-home">
      <div className="hero-body">
        <Link to="/menu">
          <p className="title is-5 has-text-white">Order Food & Drinks</p>
        </Link>
      </div>
    </section>
    {/* Space */}
    <section className="hero is-small">
      <div className="hero-body">
      </div>
    </section>
    {/* Live Now */}
    <section className="hero is-small">
      <div className="hero-body glow-subtitle">
        Live now
        {/* <p className="title is-5">Live now</p> */}
      </div>
    </section>
    {/* List of lives */}
    {getLiveArtists().includes(undefined) ?
      <section
        className="hero is-medium"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://i.imgur.com/7DAAlzJ.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
        <div className="hero-body">
          <p className="title is-5 has-text-white">Performances start from 12.00</p>
        </div>
      </section>
      : getLiveArtists().map(artist => {
        return <section
          key={artist.id}
          className="hero is-medium"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${artist.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          onClick={() => {
            findClickedAct(artist.id)
            showModal(!modal)
          }}>
          <div className="hero-body">
            <p className="title is-5 has-text-white">{artist.stage_name} Stage</p>
            <p className="subtitle is-6 has-text-white">{artist.artist_name}</p>
          </div>
          <Reactions />
        </section>
      })}
    {/* Space */}
    <section className="hero is-small">
      <div className="hero-body">
      </div>
    </section>
    {/* Up Next */}
    <section className="hero is-small">
      <div className="hero-body glow-subtitle">
        Up next
        {/* <p className="title is-5">Up Next</p> */}
      </div>
    </section>
    {/* Up Next List */}
    {getNextArtists().includes(undefined) ?
      <section
        className="hero is-medium"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://i.imgur.com/7DAAlzJ.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="hero-body">
          <p className="title is-5 has-text-white">No more performances for today</p>
        </div>
      </section>
      : getNextArtists().map(artist => {
        return <section
          key={artist.id}
          className="hero is-medium"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${artist.image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          onClick={() => {
            findClickedAct(artist.id)
            showModal(!modal)
          }}>
          <div className="hero-body">
            <p className="title is-5 has-text-white">{artist.stage_name} Stage</p>
            <p className="subtitle is-6 has-text-white">{artist.artist_name}</p>
          </div>
        </section>
      })}
    {/* Modal */}
    <div className={`modal ${modal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{actClicked.artist_name}</p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)}></button>
        </header>
        <section className="modal-card-body">
          <section>
            <img src={actClicked.image} />
            <section>
              <p>Set time : {actClicked.set_time}</p>
              <p>Stage name : {actClicked.stage_name}</p>
            </section>
            <br />
            <p>{actClicked.bio}</p>
          </section>
        </section>
        <footer className="modal-card-foot">
          <a href={actClicked.official_website} target="_blank" rel="noreferrer" className="button is-rounded is-success">More artist information</a>
        </footer>
      </div>
    </div>
  </main >
}

export default Home