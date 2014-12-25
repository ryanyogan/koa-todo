'use strict';

var middlewares = require('koa-middlewares');
var routes      = require('./routes');
var config      = require('./config');
var path        = require('path');
var http        = require('http');
var koa         = require('koa');

var app = koa();
// Ignore the favicon
app.use(middlewares.favicon());

// Response time header
app.use(middlewares.rt());

// Static file header
app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7
}));
app.use(middlewares.bodyParser());

if (config.debug && process.env.NODE_ENV !== 'test') {
  app.use(middlewares.logger());
}

app.use(middlewares.router(app));
routes(app);

app = modules.exports = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}
