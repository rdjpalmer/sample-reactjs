import React from 'react';
import Router from 'react-router';
import Application from './application';
import HomeHandler from './pages/home-handler';

var { Route, DefaultRoute } = Router;

var routes = (
  <Route name='app' path='/' handler={Application}>
    <DefaultRoute name='home' handler={HomeHandler} />
  </Route>
);

export default routes;