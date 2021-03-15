import React from 'react'
import { Link } from 'react-router-dom'


function Home() {

  return <main className='hero is-fullheight'>

    <h1 className="title has-text-centered">Welcome To Dreamland</h1>


    <section className="section" id="hero-home">
      <Link to="/acts">
        <div className="hero-body">
          <h2 className="subtitle">View Line Up</h2>
        </div>
      </Link>
    </section>


    <section className="columns is-mobile is-centered">
      <div className="column is-half has-background-link has-text-centered">
        <h3>Up Next</h3>
      </div>
      <div className="column is-half has-background-danger has-text-centered">
        <h3>Order Food & Drinks</h3>
      </div>
    </section>


    <h2 className="subtitle has-text-centered">Live Now</h2>
    <section className="columns is-mobile is-centered">
      <div className="column is-one-third has-background-link has-text-centered">
        <h3>Diamond Stage</h3>
      </div>
      <div className="column is-one-third has-background-danger has-text-centered">
        <h3>Fairground Stage</h3>
      </div>
      <div className="column is-one-third has-background-warning has-text-centered">
        <h3>The Lion Ring</h3>
      </div>
    </section>

  </main>
}

export default Home