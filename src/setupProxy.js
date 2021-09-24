const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: process.env.npm_package_proxy,
            changeOrigin: true,
        })
    );
};
