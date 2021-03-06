
import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import '.././Album.css';

class Album extends Component {
  constructor(props){
    super(props);
    const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       isPlaying: false,
       isHovered: null,
       currentTime: 0,
       duration: album.songs[0].duration,
       volume: 1
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;

  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },

    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);

  }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);

   }

  play() {
    this.audioElement.play();
    this.setState( {isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState( {isPlaying: false});
  }

  setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song});
    }

  handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       console.log('pause');

       this.pause();
     }
       else {
         if (!isSameSong) { this.setSong(song); }
         console.log('play');
         this.play();

       }
}
   onHover(song){
     this.setState( {isHovered: song});
   }
   offHover(song){
     this.setState( {isHovered: null});
   }

   playPauseButton(song, index){
     if (song === this.state.currentSong && this.state.isPlaying){
       return <ion-icon name="pause"></ion-icon>
     }
     else if (song === this.state.isHovered){
       return <ion-icon name="play"></ion-icon>
     }
     else {
       return index + 1;
     }

   }
   handlePrevClick(){
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const prevIndex = Math.max(0, currentIndex - 1);
     const prevSong = this.state.album.songs[prevIndex];
     this.setSong(prevSong);
     this.play();
   }
 handleNextClick(){
   const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
   const nextIndex = Math.min(this.state.album.songs.length - 1, currentIndex + 1);
   const nextSong = this.state.album.songs[nextIndex];
   this.setSong(nextSong);
   this.play();
 }

handleTimeChange(e){
  const newTime = this.audioElement.duration * e.target.value
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}
handleVolumeChange(e){
  const newVolume = e.target.value;
  this.audioElement.volume = newVolume;
  this.setState( { volume: newVolume});
}

formatTime(time){
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  var minSec1 = minutes + ':' + 0 + seconds;
  var minSec2 = minutes + ':' + seconds;
  if (seconds < 10) {
    return minSec1 || "-:--";
  }
  else {
    return minSec2 || "-.--"
  }
}

  render() {
    return (
      <section className="album">
           <section id="album-info">
             <img id="album-cover-art"  src={this.state.album.albumCover} alt={this.state.album.title}/>
             <div className="album-details">

             <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
             </div>
           </section>
           <table id="song-list">
             <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                {
                  this.state.album.songs.map( (song, index) =>
                    <tr className="song"
                     key={index}
                     onClick={() => this.handleSongClick(song)}>
                     <td onMouseEnter={() => this.onHover(song)} onMouseLeave={() => this.offHover(song)}> {this.playPauseButton(song, index)} </td>

                    <td> {song.title}</td>
                    <td> {this.formatTime(song.duration)}</td>

                    </tr>
                   )
                }
              </tbody>
           </table>
            <PlayerBar isPlaying={this.state.isPlaying}
             currentSong={this.state.currentSong}
             currentTime={this.audioElement.currentTime}
             duration={this.audioElement.duration}
             volume={this.audioElement.volume}
              handleSongClick={() => this.handleSongClick(this.state.currentSong)}
              handlePrevClick={() => this.handlePrevClick()}
              handleNextClick={() => this.handleNextClick()}
              handleTimeChange={(e) => this.handleTimeChange(e)}
              handleVolumeChange={(e) => this.handleVolumeChange(e)}
              formatTime={(e) => this.formatTime(e)}
               />
         </section>
    );
  }
}

export default Album;
