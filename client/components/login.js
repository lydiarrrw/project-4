import React, { useState } from 'react'
import axios from 'axios'

export default function LoginPage({ history }) {
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })
  const [error, updateError] = useState('')
 
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
      if (formData.email === '' || formData.password === '') {
        updateError('All fields are required!')
      } else {
        updateError('')
      }
    }
  }

  return <div className="body level regformback">
    <section className="container level-item regform">
      <div className="columns is-half">
        <div className="columns p-5 ">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <br />
              <input
                type="text"
                value={formData.email}
                onChange={handleChange}
                name={'email'}
              />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                name={'password'}
              />
            </div>
            <br />
            <div className="loginbutton">
              <button className="submitForm">Login</button>
            </div>
            <div className="alignerror">
              <small>{error}</small>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>

}