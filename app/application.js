import React from 'react';
import Router from 'react-router';

var { RouteHandler, Link } = Router;

var Application = React.createClass({
  statics: {
    routerWillRun({flux, state}) {
      // application doesn't need to do anything tbh...
    }
  },

  render() {
    return (
      <div>
        <nav></nav>
        <RouteHandler />
      </div>
    );
  }
});

export default Application;