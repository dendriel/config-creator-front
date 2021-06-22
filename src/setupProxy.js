const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            pathRewrite: {'^/auth' : ''},
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
    app.use(
        '/rest',
        createProxyMiddleware({
            pathRewrite: {'^/rest' : ''},
            target: 'http://localhost:8081',
            changeOrigin: true,
        })
    );
    app.use(
        '/storage',
        createProxyMiddleware({
            pathRewrite: {'^/storage' : ''},
            target: 'http://localhost:8082',
            changeOrigin: true,
        })
    );
};
