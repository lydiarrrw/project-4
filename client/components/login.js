import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LoginPage({ history }) {
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  console.log(formData)

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

  return <div className="body level">
    <section className="container level-item">
      <div className="columns is-half">
        <div className="columns p-5">
          <form onSubmit={handleSubmit}>
            <h1 className="title is-2 has-text-danger">Login</h1>
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
            <div>
              <button className="button is-danger">Login!</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>

}