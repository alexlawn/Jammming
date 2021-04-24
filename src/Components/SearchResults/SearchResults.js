import React from 'react';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {};
      // .bind(this);
    }
    // functions and set states
    render() {
      return (
        <div className = "SearchResults">
        <h2>Results</h2>
        <TrackList />
        </div>
      );
    }
  }

  export default SearchResults;