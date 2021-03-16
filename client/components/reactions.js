import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Reactions() {

  const [heartsReaction, updateHeartsReaction] = useState({
    reaction_type: '❤️'
  })
  const [act, updateAct] = useState([])
  const [reacted, updatedReacted] = useState(true)
  const token = localStorage.getItem('token')


  useEffect(() => {
    axios.get('api/acts/3', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateAct(resp.data))
  }, [])

  if (!act.id) {
    return <h1>loading</h1>
  }

  async function refreshReactions() {
    try {
      const { data } = await axios.get('api/acts/3', { headers: { Authorization: `Bearer ${token}` } })
      updateAct(data)
    } catch (err) {
      console.log(err)
    }
  }
  // ------- GET EMOJIS -----
  const reaction = act.reactions

  console.log(reaction)

  const emojis = reaction.map(item => {
    return item.reaction_type
  })


  // ----- CALCULATE EMOJI RESPONSES ---

  function getHearts(emojis) {
    return emojis === '❤️'
  }

  // function getWhoops(emojis) {
  //   return emojis === '🙌'
  // }

  // function getStarryEyes(emojis) {
  //   return emojis === '🤩'
  // }

  const hearts = emojis.filter(getHearts).length
  // const whoops = emojis.filter(getWhoops).length
  // const starryeyes = emojis.filter(getStarryEyes).length

  //---- make reaction ----
  async function postHeartReaction() {

    try {
      await axios.post('/api/reactions/3', heartsReaction, {
        headers: { Authorization: `Bearer ${token}` }
      })

    } catch (err) {
      console.log(err)
    }
    refreshReactions()
    updatedReacted(false)
    checkReaction()
  }

  //---- make reaction ----
  // async function updateHeartReaction() {

  //   try {
  //     await axios.put('/api/reactions/1', heartsReaction, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })

  //   } catch (err) {
  //     console.log(err)
  //   }
  //   refreshReactions()
  // }

  // ----- delete reaction -----
  async function deleteHeartReaction() {
    await axios.delete('/api/reactions/1', {
      headers: { Authorization: `Bearer ${token}` }

    })
    refreshReactions()
  }

  const userCheck = reaction.map(item => {
    return item.user.id
  })

  console.log(userCheck)


  function checkReaction() {
    if (userCheck.includes(4)) {
      return console.log('hello')
    }
  }

  console.log(heartsReaction)
  console.log(reacted)
  return <main>
    <p onClick={() => postHeartReaction()}>❤️ {hearts}</p>

    {/* <p>🙌{whoops}</p>
    <p>🤩{starryeyes}</p> */}
  </main>

}