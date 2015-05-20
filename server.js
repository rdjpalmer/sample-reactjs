require('babel/register');

// set up the base server
const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');
var server = express();

// misc requires
const Promise = require('promise');
const serialize = require('serialize-javascript');
const winston = require('winston');

// our logger
var log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
    // we don't want to log to a file... yet
    // new (winston.transports.File)({ filename: 'somefile.log' })
  ]
});

// Flux
const FluxComponent = require('flummox/component');
const Flux = require('./app/Flux');
// React
const React = require('react');
const Router = require('react-router');
const routes = require('./app/routes');

// utilities
const utils = require('./app/utils');
var routeStaticMethod = utils.routeStaticMethod;

/**
 * TEMPORARY BITS AND BOBS
 */

// return the favicon, but for now, do nout...
server.get('/favicon.ico', (req, res) => {
  res.end();
});

/***/

// if production...
// server.use('/assets', express.static(__dirname + '/dist'));
// else, it's development
server.use('/assets', proxy(url.parse('http://localhost:9090/')));

server.use((req, res) => {
  const router = Router.create({
    routes: routes,
    location: req.path
  });

  // instantiate new flux instance
  const flux = new Flux();

  router.run((Handler, state) => {
    const routerInfo = {
      state: state,
      flux: flux
    };

    routeStaticMethod(state.routes, 'routerWillRun', routerInfo).then(() => {
      const storeData = serialize(flux.serialize());

      // strip this out, and use a HTML template of some form... separate
      // dem concerns, yo!
      var html = React.renderToString(
        // this needs to wrap shit in the flux HoC
        React.createElement(
          FluxComponent,
          { flux: flux },
          React.createElement(Handler)
        )
      );

      res.write('<html><body><div id="app">' + html + '</div>');
      res.write('<script>window.App=' + storeData + ';</script>');
      res.write('<script src="assets/bundle.js"></script>');
      res.write('</body></html>');
      res.end();
    }).catch((err) => {
      log.error(err);
      // send to relevant error page
      res.send(err);
    });;
  });
});

server = server.listen(8080, () => {

  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
