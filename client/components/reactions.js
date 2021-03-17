import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'

export default function Reaction({ actId }) {
  const [act, updateAct] = useState({})
  const token = localStorage.getItem('token')
  // const [reacted, updateReacted] = useState('')
  // const [count, updateCount] = useState(0)
  const currentUserId = getLoggedInUserId()

  console.log('ACT ID:', actId)
  // console.log('REACTED:', reacted)
  // console.log('COUNT:', count)
  console.log('CURRENT USER ID:', currentUserId)
  console.log('ACT:', act)


  useEffect(() => {
    axios.get(`api/acts/${actId}`)
      .then(resp => updateAct(resp.data))
  }, [])


  if (!act.id) {
    return <h1>loading</h1>
  }


  // async function refreshAct() {
  //   try {
  //     const { data } = await axios.get(`api/acts/${actId}`)
  //     updateAct(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  function handleClick(event) {
    event.stopPropagation()
    console.log('Hello')
    try {
      axios.put('/api/reactions/6', { reaction_type: '❤️' }, { headers: { Authorization: `Bearer ${token}` } })
    } catch (err) {
      console.log(err)
    }
    // refreshAct()
    // hasUserAlreadyReacted()
    // countReactions()
  }

  // function hasUserAlreadyReacted() {
  //   const userList = act.reactions.map((reaction) => reaction.user.id)
  //   const findUser = userList.find(userId => userId === currentUserId)
  //   findUser ? updateReacted(true) : updateReacted(false)
  // }

  // function countReactions() {
  //   updateCount(act.reactions.length)
  // }





  // !--------------------------------------------------
  // async function refreshReactions() {
  //   try {
  //     const { data } = await axios.get('api/acts/3', { headers: { Authorization: `Bearer ${token}` } })
  //     updateAct(data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // // ------- GET EMOJIS -----
  // const reaction = act.reactions


  // const emojis = reaction.map(item => {
  //   return item.reaction_type
  // })


  // // ----- CALCULATE EMOJI RESPONSES ---

  // function getHearts(emojis) {
  //   return emojis === '❤️'
  // }

  // // function getWhoops(emojis) {
  // //   return emojis === '🙌'
  // // }

  // // function getStarryEyes(emojis) {
  // //   return emojis === '🤩'
  // // }

  // const hearts = emojis.filter(getHearts).length
  // // const whoops = emojis.filter(getWhoops).length
  // // const starryeyes = emojis.filter(getStarryEyes).length

  // //---- make reaction ----
  // async function postHeartReaction(event) {
  //   event.stopPropagation()
  //   try {
  //     await axios.post('/api/reactions/3', heartsReaction, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })

  //   } catch (err) {
  //     console.log(err)
  //   }
  //   refreshReactions()
  //   updatedReacted(false)
  //   checkReaction()
  // }

  // //---- make reaction ----
  // // async function updateHeartReaction() {

  // //   try {
  // //     await axios.put('/api/reactions/1', heartsReaction, {
  // //       headers: { Authorization: `Bearer ${token}` }
  // //     })

  // //   } catch (err) {
  // //     console.log(err)
  // //   }
  // //   refreshReactions()
  // // }

  // // ----- delete reaction -----
  // async function deleteHeartReaction() {
  //   await axios.delete('/api/reactions/1', {
  //     headers: { Authorization: `Bearer ${token}` }

  //   })
  //   refreshReactions()
  // }

  // const userCheck = reaction.map(item => {
  //   return item.user.id
  // })

  // const reactionId = reaction.map(item => {
  //   return item.id
  // })
  // // console.log('goodbye' + userCheckId)
  // //console.log('what' + reaction)
  // // console.log(userCheck.includes(currentUser))

  // function checking() {
  //   if (reactionId.includes(userCheckId)) {
  //     return console.log(reaction.id)
  //   } else {
  //     return console.log('hello 1')
  //   }
  // }
  // //console.log(checking())


  // function checkReaction() {
  //   if (userCheck.includes(4)) {
  //     return console.log('hello')
  //   }
  // }


  return <div className="columns is-mobile">
    <div className="column">
      {/* <button className={!reacted ? 'button is-dark is-rounded is-small mb-2 ml-2' : 'button is-danger is-rounded is-small mb-2 ml-2'} onClick={event => handleClick(event)}> */}
      <button className="button is-dark is-rounded is-small mb-2 ml-2" onClick={event => handleClick(event)}>
        <span>❤️</span>
        <span className="has-text-white is-size-7 pl-2">0</span>
      </button>
    </div>
  </div>
}
