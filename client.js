// Flux
import FluxComponent from 'flummox/component';
import Flux from './app/Flux';

// React
import React from 'react';
import Router from 'react-router';
import routes from './app/routes';

// utilities
import utils from './app/utils';
var { routeStaticMethod } = utils;

// le stores, passed by the server/flux to the window
var serializedStores = window.App;

// instantiate new flux instance
// temp
var flux = new Flux();

const router = Router.create({
  routes,
  location: Router.HistoryLocation
});

function render(Handler) {
  // introduce the Flummox HoC here
  React.render(
    React.createElement(
      FluxComponent,
      { flux },
      React.createElement(Handler)
    ),
    document.getElementById('app')
  );
}

var firstRender = true;

router.run((Handler, state) => {
  if(firstRender) {
    firstRender = false;
    flux.deserialize(serializedStores);
    render(Handler);
  } else {
    const routerInfo = {
      state,
      flux
    };

    routeStaticMethod(state.routes, 'routerWillRun', routerInfo).then(() => {
      render(Handler);
    });
  }
})