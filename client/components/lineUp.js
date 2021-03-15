import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LineUp() {
  const [acts, updateActs] = useState([])
  const [stage, updateStage] = useState('Diamond')
  const [modal, showModal] = useState(false)
  const [artist, updateArtist] = useState()
  const token = localStorage.getItem('token')
  const [toggle, setToggle] = useState(false)


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

  // if(!artist){
  //   return <h1>loading</h1>
  // }

  // function to filter by stage
  function filterByStage() {
    return acts.filter(act => {
      return (act.stage_name === stage)
    })
  }

  //function to update the artist 
  function clickedArtist(event) {
    const clickedArtist = event.target.innerText
    //filter through array to return artist object as state
    const filteredArtist = acts.filter(act => {
      return act.artist_name === clickedArtist
      //call the show artist modal here with artist state as arg?
    })
    return updateArtist(filteredArtist)
  }
  console.log(artist)
  //function to show artist modal
  function showArtistModal(artist) {

  }

  //function to save artist to user
  async function saveArtistToUser(event, authToken) {
    console.log(authToken)
    console.log(event)
    //need to add the recipe id 
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
    <img className="stages is-fullwidth" src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
    <div>
      {filterByStage().map(act => {
        return <div className="card" key={act.id}>
          <div className="card-content is-flex is-justify-content-space-between" key={act.id} onClick={() => showModal(!modal)}>
            <img className="image is-64x64" src={act.image} />
            <h5 className="title is-4 is-clickable" onClick={() => clickedArtist(event)}>{act.artist_name}</h5>
            <h6 className="is-size-4">{act.set_time}</h6>
            <button onClick={(event) => saveArtistToUser(event, token)}>save</button>
          </div>
        </div>
      })}
    </div>

    <div className={`modal ${modal ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"></p>
          <button className="delete" aria-label="close" onClick={() => showModal(!modal)}></button>
        </header>
        <section className="modal-card-body">
          <section>
            <img src="https://i.imgur.com/4MXuwrt.jpg" />
            <p>Tenacious D is an American comedy rock duo formed in Los Angeles, California, in 1994. It was founded by actors Jack Black and Kyle Gass, who were members of The Actors Gang theater company at the time. The duos name is derived from tenacious defense, a phrase used by NBA basketball sportscaster Marv Albert</p>
            <button className="button is-rounded is-danger is-right">Read more</button>
          </section>
          <section>
            <p>Stage Name</p>
            <p>Set Time</p>
          </section>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-rounded is-success">Back</button>
        </footer>
      </div>
    </div>

  </main>
}