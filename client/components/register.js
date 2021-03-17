import React, { useState } from 'react'
import axios from 'axios'

export default function Register({ history }) {

  const [error, updateError] = useState('')

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  })


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    updateFormData({
      ...formData,
      [name]: value
    })
  }

  // for when form is submitted
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/signup', formData)
      console.log(data)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data._message)
      if (formData.username === '' || formData.email === '' || formData.password === '' || formData.password_confirmation === '') {
        updateError('All fields are required')
      } else {
        updateError('Please try again')
      }
    }
  }

  return <div className="body level regformback">
    <section className="container level-item regform">
      <div className="columns is-half">
        <div className="columns p-5">
          <form onSubmit={handleSubmit}>
                    <div>
              <label>Username: </label>
              <br />

              <input
                type="text"
                value={formData.username}
                onChange={handleChange}
                name={'username'}
              />
            </div>
            <div>
              <div>
                <label>Email: </label>
                <br />
                <input
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  name={'email'}
                />
              </div>
            </div>
            <div>
              <label>Password: </label>
              <br />
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                name={'password'}
              />
            </div>
            <div>
              <label>Confirm Password: </label>
              <br />
              <input
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                name={'password_confirmation'}
              />
            </div>
            <br />
            <div className="loginbutton">
              <button className="submitForm">Sign up</button>
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