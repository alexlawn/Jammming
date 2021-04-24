import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {};
      // .bind(this);
    }
    // functions and set states
    render() {
      return (
        <div className="TrackList">
            // You will add a map method that renders a set of Track components
            <Track />
            <Track />
            <Track />
        </div>
      );
    }
  }

  export default TrackList;