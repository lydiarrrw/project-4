import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId }  from '../lib/auth'
// import { Link, withRouter } from 'react-router-dom'

export default function AdminDashboard() {
  const [orders, updateOrders] = useState('')
  
  const loggedIn = getLoggedInUserId()
  console.log('hello' + loggedIn)

  useEffect(() => {
    async function fetchCompany() {
      try {
        const { data } = await axios.get('/api/order')
        updateOrders(data)
        
      } catch (err) {
        console.log(err)
      }
    }
    fetchCompany()

  }, [])
  
  return <h1>Hello world</h1>
}