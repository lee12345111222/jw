const { createProxyMiddleware } = require('http-proxy-middleware');

const { server } = require('./constant/env/index');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: server,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '/'
      }
    })
  );
};
