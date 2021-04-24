import React from 'react';

class Playlist extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {};
      // .bind(this);
    }
    // functions and set states
    render() {
      return (
        <div className = "Playlist">
            <input value="New Playlist"/>
            <!-- Add a TrackList component -->
            <button className = "Playlist-save">SAVE TO SPOTIFY</button>
        </div>
      );
    }
  }

  export default Playlist;