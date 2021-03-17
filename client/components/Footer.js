import React from 'react'

const Footer = () => {

  return <footer id="footer" className='footer is-bottom'>
    <div className='is-flex-direction-column content has-text-centered'>
    
      <h6 id="footerTitle"className='title has-text-white'>© Dreamland</h6>
      <h6 className='subtitle has-text-white'>2021</h6>
      <hr />
      <section className='is-flex is-flex-direction-row is-justify-content-space-around is-size-7'>
        <p><a className='has-text-white' href='https://github.com/lydiarrrw'><strong>Lydia Wood</strong></a></p>
        <p><a className='has-text-white' href='https://github.com/fdepasse'><strong>Fabien Depasse</strong></a></p>
        <p><a className='has-text-white' href='https://github.com/kate1562'><strong>Kate Joyce</strong></a></p>
      </section>
      <div>
      <small>Festival over? Don't worry, you can find our festival playlist by <a className="footerLink" href="https://open.spotify.com/playlist/4E9nvGvmWeSmFXl6Twk3q4?si=cfd515add04b4f54">clicking here.</a></small>
      </div>
    </div>
  </footer>
}

export default Footer