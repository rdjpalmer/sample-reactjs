# Base ReactJS Project

## Todo

1. Add links to README.md 
2. Gulp task for handling CSS/Less
3. Add testing framework

## Quick start

To get up and running with the project, do the following:

### 1. Install the dependencies

```npm install```

### 2. Build the application

```gulp```

*This will also start a webpack dev server, with hot loading enabled to make development super quick*.

### 3. Serve the damn thing

Do this from a different terminal window if you're using the webpack dev server as per 2.

```npm start```

### Notes

"Requires" iojs `^v2.0.2`. It was initially set it up with Node `^v0.11.0`, however there is a plan to use [Jest](#) which requires [JSDom](#), which no longer supports [Node].

It's pretty simple to [switch to iojs](https://keymetrics.io/2015/02/03/installing-node-js-and-io-js-with-nvm/).

