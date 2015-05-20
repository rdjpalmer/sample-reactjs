import React from 'react';

var Home = React.createClass({
  render() {
    /**
     * Initial props aren't getting set
     * for one reason or another...
     * examine Flummox example & docs to figure
     * this one out, but for now, bed.
     */
    if(!this.props.news) {
      return null;
    }

    return (
      <div>Latest news id: {this.props.news.id}</div>
    );
  }
});

export default Home;