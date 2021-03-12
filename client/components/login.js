import React, {useState, useEffect } from 'react'
import axios from 'axios'

export default function LoginPage({ history }){
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData)

      if (localStorage) {
        localStorage.setItem('token', data.token)
        //keep token in local storage while in session›
      }
      history.push('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }
  
  return <form onSubmit={handleSubmit}>
    <div>
      <label>Email</label>
      <input
        type="text"
        value={formData.email}
        onChange={handleChange}
        name={'email'}
      />
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        value={formData.password}
        onChange={handleChange}
        name={'password'}
      />
    </div>
    <button>Login!</button>
  </form>
  
}