const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/storage',
        createProxyMiddleware({
            pathRewrite: {'^/storage' : ''},
            target: 'http://localhost:8082',
            changeOrigin: true,
        })
    );

    app.use(
        '/auth',
        createProxyMiddleware({
            pathRewrite: {'^/auth' : ''},
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};
