import restService from "./api";

const proxyPath = "/auth"

function authenticate(username, password) {
    console.log("Authenticate")
    return restService.api.post(proxyPath + '/authenticate', { username, password })
        .catch(error => {
            console.log("Failed to authenticate. " + error.message)
            throw error
        })
}

const authService = {
    authenticate: authenticate
}

export default authService;
