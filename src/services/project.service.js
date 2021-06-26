import restService from "./rest.service";

const proxyPath = "/rest"
const path = proxyPath + "/project"

const projectService = {
    getById: (id) => restService.getById(path, id),
    getAll: (offset, limit) => restService.getAll(path, offset, limit),
    removeById: (id) => restService.removeById(path, id),
    save: (data) => restService.save(path, data)
}

export default projectService
