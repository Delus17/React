const {createProxyMiddleware} = require('http-proxy-middleware');

/**
 * Sets up proxy middleware for API and statics.
 * @param {import('express').Application} app
 */
module.exports = function(app) {
  app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:12301/api',
    changeOrigin: true,
  })
  );
  app.use(
  '/statics',
  createProxyMiddleware({
    target: 'http://localhost:12301/statics',
    changeOrigin: true,
  })
  );
};
