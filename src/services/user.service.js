import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/user"

const setDefaultProject = (projectId) => {
    return restService.api.patch(path + "/defaultProject/" + projectId)
}

const getMyUser = () => {
    return restService.api.get(path)
}

const userService = {
    setDefaultProject: setDefaultProject,
    getMyUser: getMyUser
}

export default userService
