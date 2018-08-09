import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
      <section id="buttons">
       <button id="previous" onClick={this.props.handlePrevClick}>
        <ion-icon name="skip-backward"></ion-icon>
       </button>
       <button id="play-pause" onClick={this.props.handleSongClick} >
         <ion-icon name={this.props.isPlaying ? "pause" : "play"}></ion-icon>

       </button>
       <button id="next">
        <ion-icon name="skip-forward"></ion-icon>
       </button>
     </section>
     <section id="time-control">
       <div className="current-time">–:––</div>
       <input type="range" className="seek-bar" value="0" />
       <div className="total-time">–:––</div>
     </section>
     <section id="volume-control">
       <ion-icon name="volume-low"></ion-icon>
       <input type="range" className="seek-bar" value="80" />
       <ion-icon name="volume-high"></ion-icon>
     </section>
      </section>
    );
  }
}

export default PlayerBar;
