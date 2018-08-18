import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 import albumData from './../data/albums';
 import '.././Library.css';



class Library  extends Component {
  constructor(props){
    super(props);
    this.state = { albums: albumData };
  }
  render() {
    return (
      <section className="container" id="library">
        <div className="row">

        {
          this.state.albums.map( (album, index) =>
        <Link to={`/album/${album.slug}`} key={index}>
      <div className="col-m-6" id="album">
         <img id="resize" src={album.albumCover} alt={album.title} />
            <div>{album.title}</div>
            <div>{album.artist}</div>
            <div>{album.songs.length} songs</div>
            </div>
         </Link>
       )
        }

        </div>
      </section>
    );
  }
}



export default Library;
