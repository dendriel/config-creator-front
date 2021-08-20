const { createProxyMiddleware } = require('http-proxy-middleware');

const auth_url = process.env.AUTH_URL || 'http://localhost:8080'
const rest_url = process.env.REST_URL || 'http://localhost:8081'
const storage_url = process.env.STORAGE_URL || 'http://localhost:8082'

module.exports = function(app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            pathRewrite: {'^/auth' : ''},
            target: auth_url,
            changeOrigin: true,
        })
    );
    app.use(
        '/rest',
        createProxyMiddleware({
            pathRewrite: {'^/rest' : ''},
            target: rest_url,
            changeOrigin: true,
        })
    );
    app.use(
        '/storage',
        createProxyMiddleware({
            pathRewrite: {'^/storage' : ''},
            target: storage_url,
            changeOrigin: true,
        })
    );
};
