import React from 'react';
import '.././Landing.css'

const Landing = () => (

  <section className="container" id="landing">
  <h1 className="hero-title">Turn the music up!</h1>
<div className="col-md-12" id="space"></div>
  <section className="row" id="selling-points">
    <div className="col" id="column-1">
      <h2 className="point-title">Choose your music</h2>
      <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
    </div>
    <div className="col" id="column-2">
      <h2 className="point-title">Unlimited, streaming, ad-free</h2>
      <p className="point-description">No arbitrary limits. No distractions.</p>
    </div>
    <div className="col" id="column-3">
      <h2 className="point-title">Mobile enabled</h2>
      <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
    </div>
  </section>

  </section>

);

export default Landing;
