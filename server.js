const express = require('express');
const path = require('path');

const app = express();

// Server Routes to go here before webpack e.g.
app.get('/hello', (req, res) => {
    res.send({
        hi: 'there'
    });
});

if(process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
    app.use(express.static('dist')); // makes dist available
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    }); // compatibility with react router browserHistory - any get request, send back index.html
}

// var server = app.listen(3050);
var server = app.listen(process.env.PORT || 3050); // if host provided port use that, else use 3050
console.log('-----------------------');
console.log('| Node Server Started |');
console.log('-----------------------');
console.log('Listening on port: ' + server.address().port);