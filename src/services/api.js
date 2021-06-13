import Axios from "axios";
import cookies from "js-cookie"

let urls = {
    test: `http://localhost:8080`,
    development: 'http://localhost:8080/',
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
        return;
    }

    if (error.response.status === 403 || error.response.status === 401) {
        console.log("Not logged in");
        cookies.remove('token')
        restService.setToken(null)
        restService.redirect.push('/login')
    }
    else {
        throw error;
    }
});

export default restService;
