import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Home() {
  const [acts, updateActs] = useState([])
  const [time, updateTime] = useState(new Date())

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



  return <main>

    <h1 className="title has-text-centered">Welcome To Dreamland</h1>

    <section className="hero is-medium" id="hero-home">
      <div className="hero-body">
        <Link to="/lineup">
          <p className="title is-5 has-text-white">View Line Up</p>
        </Link>
      </div>
    </section>


    <section className="hero is-medium" id="food-drinks-home">
      <div className="hero-body">
        <Link to="/menu">
          <p className="title is-5 has-text-white">Order Food & Drinks</p>
        </Link>
      </div>
    </section>


    <section className="hero is-medium">
      <div className="hero-body">
        <p className="title is-5">Live Now</p>
      </div>
    </section>

    <section className="hero is-medium">
      <div className="hero-body">
        <p className="title is-5">Live Now</p>
      </div>
    </section>





    <section className="hero is-medium">
      <div className="hero-body">
        <p className="title is-5">Up Next</p>
        {getNextArtists().includes(undefined) ?
          'The last artists are currently on stage'
          : getNextArtists().map(artist => {
            return <p key={artist.id}> 
              {artist.artist_name}
            </p>
          })}
      </div>
    </section>





    <div className="columns is-mobile is-centered">
      <div className="column is-full">

        <h3>Up Next</h3>
        {getNextArtists().includes(undefined) ?
          'The last artists are currently on stage'
          : getNextArtists().map(artist => {
            return <div key={artist.id}>
              {artist.artist_name}
            </div>
          })}

      </div>
    </div>


    <h2 className="subtitle has-text-centered">Live Now</h2>
    <section className="columns is-mobile is-centered">
      <div className="column is-one-third has-background-link has-text-centered">
        <h3>Diamond Stage</h3>
        {getLiveArtists().includes(undefined) ?
          'First artists will be on stage from 12:00'
          : getLiveArtists().filter(artist => artist.stage_name === 'Diamond').map(artist => {
            return <div key={artist.id}>
              {artist.artist_name}
            </div>
          })}
      </div>
      <div className="column is-one-third has-background-danger has-text-centered">
        <h3>Fairground Stage</h3>
        {getLiveArtists().includes(undefined) ?
          'First artists will be on stage from 12:00'
          : getLiveArtists().filter(artist => artist.stage_name === 'Fairground').map(artist => {
            return <div key={artist.id}>
              {artist.artist_name}
            </div>
          })}
      </div>
      <div className="column is-one-third has-background-warning has-text-centered">
        <h3>Lion Ring</h3>
        {getLiveArtists().includes(undefined) ?
          'First artists will be on stage from 12:00'
          : getLiveArtists().filter(artist => artist.stage_name === 'Lion Ring').map(artist => {
            return <div key={artist.id}>
              {artist.artist_name}
            </div>
          })}
      </div>
    </section>

  </main >
}

export default Home