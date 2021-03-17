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

  const emojis = reaction.map(item => {
    return item.reaction_type
  })


  // ----- CALCULATE EMOJI RESPONSES ---

  function getHearts(emojis) {
    return emojis === '❤️'
  }


  const hearts = emojis.filter(getHearts).length


  //---- make reaction ----
  async function postHeartReaction(event) {
    event.stopPropagation()
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

  const reactionId = reaction.map(item => {
    return item.id
  })
  // console.log('goodbye' + userCheckId)
  //console.log('what' + reaction)
  // console.log(userCheck.includes(currentUser))

  function checking() {
    if (reactionId.includes(userCheckId)) {
      return console.log(reaction.id)
    } else {
      return console.log('hello 1')
    }
  }
  //console.log(checking())


  function checkReaction() {
    if (userCheck.includes(4)) {
      return console.log('hello')
    }
  }


  return <div className="columns is-mobile">
    <div className="column">
      <div className="columns is-mobile">
        <div className="column">
          <p className="has-text-centered" onClick={(event) => postHeartReaction(event)}>
            <span className="has-text-white">❤️</span>
            <span className="has-text-white is-size-7 pl-2">{hearts}</span>
          </p>
        </div>
        <div className="column">
          <p className="has-text-centered" onClick={(event) => postHeartReaction(event)}>
            <span className="has-text-white">🔥 </span>
            <span className="has-text-white is-size-7 pl-2">{hearts}</span>
          </p>
        </div>
        <div className="column">
          <p className="has-text-centered" onClick={(event) => postHeartReaction(event)}>
            <span className="has-text-white">🙌 </span>
            <span className="has-text-white is-size-7 pl-2">{hearts}</span>
          </p>
        </div>
        <div className="column">
          <p className="has-text-centered" onClick={(event) => postHeartReaction(event)}>
            <span className="has-text-white">🎉</span>
            <span className="has-text-white is-size-7 pl-2">{hearts}</span>
          </p>
        </div>
        <div className="column">
          <p className="has-text-centered" onClick={(event) => postHeartReaction(event)}>
            <span className="has-text-white">🤩</span>
            <span className="has-text-white is-size-7 pl-2">{hearts}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
}
