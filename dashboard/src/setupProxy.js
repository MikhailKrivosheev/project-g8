const createProxyMiddleware = require('http-proxy-middleware');

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(
    '/files',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_URL,
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
  app.use(
    '/dashboard-api',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_URL,
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_URL,
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
  app.use(
    '/storage',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_URL,
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
