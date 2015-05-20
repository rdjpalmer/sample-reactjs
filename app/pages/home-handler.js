import React from 'react';
import Promise from 'promise';
import FluxComponent from 'flummox/component';
import Home from './home';

var HomeHandler = React.createClass({
  getInitialState() {
    return {
      id: null
    };
  },
  statics: {
    routerWillRun({flux, state}) {
      const newsActions = flux.getActions('news');

      return new Promise((fufill, reject) => {
        newsActions.getId().then((id) => {
          fufill(id);
        });
      }).catch((err) => {
        console.error(err)
      });
    }
  },
  render() {
    return (
      <div>
        <h1>Home</h1>
        <FluxComponent connectToStores={{
          news: store => ({
            news: store.state
          })
        }}>
          <Home />
        </FluxComponent>
      </div>
    );
  }
});

export default HomeHandler;