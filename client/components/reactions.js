import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'

export default function Reactions({ match }) {

// const id = match.params.actid

  const currentUser = getLoggedInUserId()
  const [heartsReaction, updateHeartsReaction] = useState({
    reaction_type: '❤️'
  })
  const [act, updateAct] = useState([])
  const [reacted, updatedReacted] = useState(true)

  // const [userData, updateUserData] = useState({})
  const token = localStorage.getItem('token')

// `api/acts/${id}`
  // ------- GET ACTS-----
  useEffect(() => {
    axios.get('api/acts/3', { headers: { Authorization: `Bearer ${token}` } })
      .then(resp => updateAct(resp.data))
  }, [])

  if (!act.id) {
    return <h1>loading</h1>
  }

  // ------- REFRESH REACTIONS -----
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

  //---- MAKE REACTION ----
  async function postHeartReaction(actid) {

    try {
      await axios.post(`/api/reactions/${actid}`, heartsReaction, {
        headers: { Authorization: `Bearer ${token}` }
      })

    } catch (err) {
      console.log(err)
    }
    refreshReactions()
    updatedReacted(false)

  }

  // ----- DELETE REACTION -----
  async function deleteHeartReaction(reactionid) {
    await axios.delete(`/api/reactions/${reactionid}`, {
      headers: { Authorization: `Bearer ${token}` }

    })
    refreshReactions()
  }
  const userCheckId = reaction.map(item => {
    return item.user.id
  })

  const reactionId = reaction.map(item => {
    return item.id
  })
  // console.log('goodbye' + userCheckId)
  console.log('what' + reaction)
  // console.log(userCheck.includes(currentUser))

  function checking() {
    if (reactionId.includes(userCheckId)) {
      return console.log(reaction.id)
    } else {
      return console.log('hello')
    }
  }
  console.log(checking())


  // ----- COMPARE REACTION -----
  function checkReaction(actid) {

    if (userCheckId.includes(currentUser)) {
      deleteHeartReaction()
    } else {
      postHeartReaction(actid)
    }

  }

  return <main>
    <p onClick={() => checkReaction(act.id)}>❤️ {hearts}</p>

    {/* <p>🙌{whoops}</p>
    <p>🤩{starryeyes}</p> */}
  </main>

}

