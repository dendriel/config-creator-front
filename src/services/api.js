import Axios from "axios";
import cookies from "js-cookie"

let urls = {
    test: `http://localhost:8080`,
    development: 'http://localhost:3000/',
    production: 'https://your-production-url.com/'
}

const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const restService = {
    api: api,
    redirect: null,
    setToken: null,
    logout: () => {
        console.log("Logging out")
        cookies.remove('token')
        restService.setToken(null)
        restService.redirect.push('/login')
    }
}

api.interceptors.response.use((response) => response, (error) => {
    if (!error) {
        console.log("Not an error")
        return;
    }
    // console.log("interceptor " + JSON.stringify(error))

    if (window.location.pathname !== '/login' &&
        (error.response.status === 403 || error.response.status === 401)) {
        restService.logout()
    }
    else {
        throw error;
    }
});

export default restService;
