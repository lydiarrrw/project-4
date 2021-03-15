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
        <h2 className='subtitle'>My Personal Lineup </h2>
        {userData.acts.map(act => {
          return <div key={act.id}>
            {act.set_time}, {act.artist_name}, {act.stage_name}
          </div>
        })}
      </section>

      <section className='section'>
        <h2 className='subtitle'>My Orders</h2>
      </section>

    </section>
  </main>
}

export default Profile